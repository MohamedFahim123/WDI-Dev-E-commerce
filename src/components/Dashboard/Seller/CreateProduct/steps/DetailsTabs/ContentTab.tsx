"use client";

import type { FormValues } from "@/src/validation/ProductSchema";
import { useFormContext } from "react-hook-form";
import FormInput from "../../../Settings/common/FormInput";
import FormTextArea from "../../../Settings/common/FormTextArea";
import UploadBox from "../../../Settings/common/UploadBox";

export default function ContentTab() {
  const { register, setValue, watch, formState } = useFormContext<FormValues>();
  const images = watch("images") ?? [];
  const { errors } = formState;

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    setValue("images", arr, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <section>
      <h4 className="text-sm font-medium mb-2">Content</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormInput
          label="Title EN"
          {...register("titleEN")}
          error={errors.titleEN?.message as string | undefined}
        />
        <FormInput
          label="Title AR"
          {...register("titleAR")}
          error={errors.titleAR?.message as string | undefined}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        <FormTextArea
          label="Long Description EN"
          {...register("longDescriptionEN")}
        />
        <FormTextArea
          label="Long Description AR"
          {...register("longDescriptionAR")}
        />
      </div>

      <div className="mt-3">
        <div className="text-sm font-medium mb-2">Images</div>
        <UploadBox
          placeholder="Drop images or Browse"
          multiple
          accept="image/*"
          onChange={onFiles}
        />
        {images.length > 0 && (
          <div className="mt-3 flex gap-2 flex-wrap">
            {images.map((file: unknown, idx: number) => {
              const f = file as File;
              return (
                <div
                  key={idx}
                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                >
                  {f.name ?? `image-${idx}`}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
