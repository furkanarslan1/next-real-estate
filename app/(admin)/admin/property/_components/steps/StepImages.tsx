"use client";

import { useState, useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { propertySchema } from "@/schemas/propertySchema";
import z from "zod";
import { FormLabel, FormItem } from "@/components/ui/form";
import { X, UploadCloud, Loader2, Star } from "lucide-react";
import imageCompression from "browser-image-compression";
import { Button } from "@/components/ui/button";

type PropertyFormInput = z.input<typeof propertySchema>;

// Resim dosya yapısı için tip tanımı
export interface ImageFile {
  file: File;
  preview: string;
  isCover: boolean;
}

interface StepImagesProps {
  form: UseFormReturn<PropertyFormInput>;
  // Üst bileşene dosyaları göndermek için callback
  onImagesChange: (images: ImageFile[]) => void;
}

export function StepImages({ form, onImagesChange }: StepImagesProps) {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dosyalar her değiştiğinde hem Form state'ini hem de üst bileşeni güncelle
  useEffect(() => {
    form.setValue(
      "images",
      imageFiles.map((img) => img.file.name),
      {
        shouldValidate: true,
      }
    );
    onImagesChange(imageFiles);
  }, [imageFiles, form, onImagesChange]);

  const processFiles = async (files: FileList | File[]) => {
    setIsCompressing(true);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const newImages: ImageFile[] = [];
      for (const file of Array.from(files)) {
        const compressed = await imageCompression(file, options);
        newImages.push({
          file: compressed,
          preview: URL.createObjectURL(compressed),
          isCover: false,
        });
      }

      setImageFiles((prev) => {
        const combined = [...prev, ...newImages];
        if (!combined.some((img) => img.isCover) && combined.length > 0) {
          combined[0].isCover = true;
        }
        return combined;
      });
    } catch (error) {
      console.error("Compression error:", error);
    } finally {
      setIsCompressing(false);
    }
  };

  const setAsCover = (index: number) => {
    setImageFiles((prev) => {
      const newFiles = [...prev];
      const [selected] = newFiles.splice(index, 1);
      // Seçileni en başa koy ve isCover yap
      return [
        { ...selected, isCover: true },
        ...newFiles.map((img) => ({ ...img, isCover: false })),
      ];
    });
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (prev[index].isCover && updated.length > 0) {
        updated[0].isCover = true;
      }
      return updated;
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <FormItem>
        <FormLabel className="text-lg font-bold">
          Property Photos ({imageFiles.length})
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
              Compressed automatically for better SEO performance
            </p>
          </div>
        </div>
      </FormItem>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {imageFiles.map((img, index) => (
          <div
            key={index}
            className={`relative aspect-square rounded-xl overflow-hidden border-2 ${
              img.isCover ? "border-primary shadow-lg" : "border-transparent"
            }`}
          >
            <img
              src={img.preview}
              alt=""
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
                variant={img.isCover ? "default" : "secondary"}
                className="w-full text-[10px] h-7"
                onClick={(e) => {
                  e.stopPropagation();
                  setAsCover(index);
                }}
              >
                {img.isCover ? "Main Photo" : "Set as Main"}
              </Button>
            </div>
            {img.isCover && (
              <div className="absolute top-2 left-2 bg-primary text-white p-1 rounded-md">
                <Star size={12} fill="currentColor" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
