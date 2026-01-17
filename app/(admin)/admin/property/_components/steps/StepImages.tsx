"use client";

import { useState, useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { propertySchema } from "@/schemas/propertySchema";
import z from "zod";
import { FormLabel, FormItem } from "@/components/ui/form";
import { X, UploadCloud, Loader2, Star } from "lucide-react";
import imageCompression from "browser-image-compression";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // Toast eklemeyi unutma

type PropertyFormInput = z.input<typeof propertySchema>;

export interface ImageFile {
  file: File;
  preview: string;
  isCover: boolean;
}

interface StepImagesProps {
  form: UseFormReturn<PropertyFormInput>;
  initialImages?: string[];
  onImagesChange: (images: ImageFile[]) => void;
  onRemoveInitialImage?: (url: string) => void;
  coverImage?: string;
  onSetCover: (url: string) => void;
}

export function StepImages({
  form,
  onImagesChange,
  initialImages = [],
  onRemoveInitialImage,
  coverImage,
  onSetCover,
}: StepImagesProps) {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Security & Optimization Limits / Güvenlik ve Optimizasyon Limitleri
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB (Compression öncesi ham dosya limiti)
  const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

  useEffect(() => {
    form.setValue(
      "images",
      imageFiles.map((img) => img.file.name),
      { shouldValidate: true }
    );
    onImagesChange(imageFiles);
  }, [imageFiles, form, onImagesChange]);

  /**
   * Validates files before processing
   * Dosyaları işlemeden önce doğrular
   */
  const validateFile = (file: File): boolean => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error(
        `Unsupported format: ${file.name}. Please use JPG, PNG or WEBP.`
      );
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error(
        `File too large: ${file.name}. Maximum limit is 5MB before compression.`
      );
      return false;
    }
    return true;
  };

  const processFiles = async (files: FileList | File[]) => {
    const rawFiles = Array.from(files);

    // Filter out invalid files / Geçersiz dosyaları ayıkla
    const validFiles = rawFiles.filter(validateFile);

    if (validFiles.length === 0) return;

    setIsCompressing(true);

    // Compression options / Sıkıştırma ayarları
    const options = {
      maxSizeMB: 1, // Aim for 1MB / 1MB hedefle
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const newImages: ImageFile[] = [];

      for (const file of validFiles) {
        // Step 1: Compress the image / Resmi sıkıştır
        const compressed = await imageCompression(file, options);

        // Step 2: Check compressed size again (extra safety) / Ek güvenlik kontrolü
        if (compressed.size > 2 * 1024 * 1024) {
          toast.warning(
            `${file.name} is still over 2MB after compression. Performance might be affected.`
          );
        }

        newImages.push({
          file: compressed,
          preview: URL.createObjectURL(compressed),
          isCover: false,
        });
      }

      setImageFiles((prev) => {
        const combined = [...prev, ...newImages];
        // Ensure at least one image is cover / En az bir resmin kapak olduğundan emin ol
        // if (!combined.some((img) => img.isCover) && combined.length > 0) {
        //   combined[0].isCover = true;
        // }
        if (!coverImage && combined.length > 0) {
          onSetCover(combined[0].preview);
        }
        return combined;
      });
    } catch (error) {
      console.error("Compression error:", error);
      toast.error("An error occurred while processing images.");
    } finally {
      setIsCompressing(false);
      // Reset input value to allow selecting same file again
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // ... (setAsCover and removeImage functions remain the same)
  const setAsCover = (index: number) => {
    setImageFiles((prev) => {
      const newFiles = [...prev];
      const [selected] = newFiles.splice(index, 1);
      return [
        { ...selected, isCover: true },
        ...newFiles.map((img) => ({ ...img, isCover: false })),
      ];
    });
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (prev[index]?.isCover && updated.length > 0) {
        updated[0].isCover = true;
      }
      return updated;
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ... UI Elements (Keep your existing drag & drop UI here) */}
      <FormItem>
        <FormLabel className="text-lg font-bold">
          Property Photos ({initialImages.length + imageFiles.length})
        </FormLabel>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.dataTransfer.files) processFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-4 border-dashed rounded-2xl p-16 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer ${
            isCompressing
              ? "bg-muted animate-pulse"
              : "hover:bg-primary/5 hover:border-primary/40 border-muted-foreground/20"
          }`}
        >
          <input
            type="file"
            multiple
            hidden
            ref={fileInputRef}
            accept={ACCEPTED_TYPES.join(",")}
            onChange={(e) => e.target.files && processFiles(e.target.files)}
          />
          {isCompressing ? (
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          ) : (
            <UploadCloud className="w-16 h-16 text-primary/60" />
          )}
          <div className="text-center">
            <p className="text-xl font-semibold">
              Drop images or click to browse
            </p>
            <p className="text-muted-foreground text-sm">
              Max 5MB per file. Supports JPG, PNG, WEBP.
            </p>
          </div>
        </div>
      </FormItem>

      {/* Grid rendering remains same */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* SHOW OLD IMAGES */}
        {/* SHOW OLD IMAGES (Eski Resimler) */}
        {initialImages.map((url, index) => {
          // Değişkeni burada tanımlamak için süslü parantez ve 'return' kullanmalıyız
          const isCover = coverImage === url;

          return (
            <div
              key={`initial-${index}`}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                isCover ? "border-primary shadow-md" : "border-muted"
              }`}
            >
              <img
                src={url}
                alt="Existing"
                className="w-full h-full object-cover transition-opacity group-hover:opacity-75"
              />

              {/* Kontrol Katmanı */}
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                {/* Üst Kısım: Silme Butonu */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveInitialImage?.(url);
                  }}
                  className="self-end bg-destructive text-white p-1 rounded-full hover:scale-110 transition-transform"
                >
                  <X size={16} />
                </button>

                {/* Alt Kısım: Kapak Yap Butonu */}
                <Button
                  type="button"
                  size="sm"
                  variant={isCover ? "default" : "secondary"}
                  className="w-full text-[10px] h-7 font-bold shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSetCover(url);
                  }}
                >
                  {isCover ? (
                    <span className="flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> Main Photo
                    </span>
                  ) : (
                    "Set as Main"
                  )}
                </Button>
              </div>
            </div>
          );
        })}

        {/* SHOW NEW IMAGES (Yeni Resimler) */}
        {imageFiles.map((img, index) => {
          // Yeni resimler için de 'coverImage' state'ine bakıyoruz
          const isCover = coverImage === img.preview;

          return (
            <div
              key={`new-${index}`}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                isCover ? "border-primary shadow-md" : "border-transparent"
              }`}
            >
              <img
                src={img.preview}
                alt="New"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="self-end bg-destructive text-white p-1 rounded-full"
                >
                  <X size={14} />
                </button>
                <Button
                  type="button"
                  size="sm"
                  variant={isCover ? "default" : "secondary"}
                  className="w-full text-[10px] h-7 font-bold shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSetCover(img.preview); // Yeni resmin preview URL'ini kapak yap
                  }}
                >
                  {isCover ? (
                    <span className="flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> Main Photo
                    </span>
                  ) : (
                    "Set as Main"
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
