/**
 * UIFileUploadZone.tsx
 * Molecule component — Atomic Design (molecules prefix: UIComponent)
 *
 * Dependencies (atoms):
 *   BaseProgress → @/components/atoms/BaseProgress
 *
 * Features:
 *   ✅ variant="wide" | "compact"
 *   ✅ single & multiple file upload
 *   ✅ drag & drop
 *   ✅ file size validation
 *   ✅ real API upload via `uploadFn` prop (with progress tracking)
 *   ✅ fallback to simulated progress if `uploadFn` not provided
 *   ✅ abort/cancel upload
 *   ✅ retry on error
 */

import React, { useCallback, useRef, useState } from "react";
import { Box, Flex, Grid, Text, Icon, Image } from "@chakra-ui/react";
import { Upload, Trash2, AlertCircle, RefreshCw, X } from "lucide-react";

// ─── Atom stubs — replace with real imports ───────────────────────────────────
// import BaseProgress from "@/components/atoms/BaseProgress";

const BaseProgress: React.FC<{ value: number; colorScheme?: string }> = ({
  value,
  colorScheme = "blue",
}) => {
  const colors: Record<string, string> = {
    blue: "#4361ee",
    orange: "#f77f00",
    red: "#e53e3e",
  };
  return (
    <Box w="full" h="6px" bg="gray.200" borderRadius="full" overflow="hidden">
      <Box
        h="full"
        w={`${value}%`}
        bg={colors[colorScheme]}
        borderRadius="full"
        transition="width 0.3s ease"
      />
    </Box>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

export type UploadFileState =
  | "idle"       // just added, not yet started
  | "uploading"  // in progress
  | "done"       // success
  | "error";     // failed (size exceeded or API error)

export type UploadErrorReason = "size_exceeded" | "api_error" | "aborted";

export interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  progress: number;           // 0–100
  state: UploadFileState;
  sizeMb: number;
  maxSizeMb: number;
  errorReason?: UploadErrorReason;
  errorMessage?: string;
  /** The value returned by your uploadFn on success */
  uploadedUrl?: string;
  /** AbortController to cancel in-flight upload */
  abortController?: AbortController;
}

/**
 * uploadFn — inject your real API call here.
 *
 * @param file        The File object to upload
 * @param onProgress  Call this with 0–100 as upload progresses
 * @param signal      AbortSignal — abort if the user cancels
 * @returns           Resolved value is stored in `uploadedFile.uploadedUrl`
 *
 * Example with axios:
 *   const myUploadFn: UploadFn = async (file, onProgress, signal) => {
 *     const formData = new FormData();
 *     formData.append("file", file);
 *     const res = await axios.post("/api/upload", formData, {
 *       onUploadProgress: (e) => onProgress(Math.round((e.loaded / e.total!) * 100)),
 *       signal,
 *     });
 *     return res.data.url;
 *   };
 *
 * Example with fetch + ReadableStream progress:
 *   const myUploadFn: UploadFn = async (file, onProgress, signal) => {
 *     const formData = new FormData();
 *     formData.append("file", file);
 *     const res = await fetch("/api/upload", { method: "POST", body: formData, signal });
 *     const data = await res.json();
 *     return data.url;
 *   };
 */
export type UploadFn = (
  file: File,
  onProgress: (percent: number) => void,
  signal: AbortSignal
) => Promise<string>;

export interface UIFileUploadZoneProps {
  /** "wide" = full-width drop zone  |  "compact" = thumbnail grid only */
  variant?: "wide" | "compact";
  /** Allow multiple files */
  multiple?: boolean;
  /** Accepted MIME types. Default: jpg, png, gif */
  accept?: string[];
  /** Max file size in MB. Default: 25 */
  maxSizeMb?: number;
  /**
   * Your API upload function.
   * If omitted, the component falls back to simulated progress (for development).
   */
  uploadFn?: UploadFn;
  /** Called whenever the file list changes (after add, remove, progress, done) */
  onChange?: (files: UploadedFile[]) => void;
  /** Called when a file finishes uploading successfully */
  onUploadSuccess?: (file: UploadedFile) => void;
  /** Called when a file upload fails */
  onUploadError?: (file: UploadedFile, reason: UploadErrorReason) => void;
  /**
   * Grid columns — responsive Chakra array or fixed number.
   * Default: [2, 3, 5]
   */
  columns?: number | number[];
  /** ms per tick for simulated progress (only used when uploadFn is not provided). Default: 60 */
  simulateUploadMs?: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
let idCounter = 0;
const genId = () => `uf-${++idCounter}-${Date.now()}`;
const toMb = (bytes: number) => parseFloat((bytes / (1024 * 1024)).toFixed(1));

// ─── Wide drop zone ───────────────────────────────────────────────────────────
const WideDropZone: React.FC<{
  onFiles: (files: File[]) => void;
  multiple: boolean;
  accept: string[];
}> = ({ onFiles, multiple, accept }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const dropped = Array.from(e.dataTransfer.files);
      onFiles(multiple ? dropped : dropped.slice(0, 1));
    },
    [multiple, onFiles]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    onFiles(multiple ? picked : picked.slice(0, 1));
    e.target.value = "";
  };

  return (
    <Box
      w="full"
      border="2px dashed"
      borderColor={dragging ? "blue.400" : "blue.200"}
      borderRadius="xl"
      bg={dragging ? "blue.50" : "white"}
      transition="all 0.2s"
      py={16}
      textAlign="center"
      cursor="pointer"
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={accept.join(",")}
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <Flex direction="column" align="center" gap={2}>
        <Icon as={Upload} boxSize={6} color="blue.500" />
        <Text fontSize="sm" color="gray.500">
          Drag and drop files or click upload
        </Text>
      </Flex>
    </Box>
  );
};

// ─── Thumbnail cell ───────────────────────────────────────────────────────────
const ThumbnailCell: React.FC<{
  uf: UploadedFile;
  onRemove: (id: string) => void;
  onAbort: (id: string) => void;
  onRetry: (id: string) => void;
}> = ({ uf, onRemove, onAbort, onRetry }) => {
  const isError = uf.state === "error";
  const isUploading = uf.state === "uploading";
  const isDone = uf.state === "done";
  const isSizeError = uf.errorReason === "size_exceeded";

  return (
    <Flex direction="column" gap={1} w="full" minW={0}>
      {/* ── Image box ── */}
      <Box
        position="relative"
        w="full"
        pt="75%"
        borderRadius="lg"
        overflow="hidden"
        bg="gray.100"
      >
        <Image
          src={uf.preview}
          alt={uf.file.name}
          position="absolute"
          inset={0}
          w="full"
          h="full"
          objectFit="cover"
        />

        {/* Uploading — abort button */}
        {isUploading && (
          <Box
            position="absolute"
            inset={0}
            bg="blackAlpha.200"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Flex
              w="28px"
              h="28px"
              borderRadius="full"
              bg="whiteAlpha.800"
              align="center"
              justify="center"
              cursor="pointer"
              onClick={() => onAbort(uf.id)}
              _hover={{ bg: "white" }}
            >
              <Icon as={X} boxSize={3} color="gray.600" />
            </Flex>
          </Box>
        )}

        {/* Done — trash */}
        {isDone && (
          <Box
            position="absolute"
            inset={0}
            bg="blackAlpha.300"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onClick={() => onRemove(uf.id)}
          >
            <Flex
              w="32px"
              h="32px"
              borderRadius="full"
              bg="red.500"
              align="center"
              justify="center"
            >
              <Icon as={Trash2} color="white" boxSize={4} />
            </Flex>
          </Box>
        )}

        {/* Error — alert + retry (only for API errors, not size) */}
        {isError && (
          <Box
            position="absolute"
            inset={0}
            bg="blackAlpha.500"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Flex
              w="32px"
              h="32px"
              borderRadius="full"
              border="2px solid white"
              align="center"
              justify="center"
            >
              <Icon as={AlertCircle} color="white" boxSize={4} />
            </Flex>
            {!isSizeError && (
              <Flex
                w="32px"
                h="32px"
                borderRadius="full"
                bg="whiteAlpha.800"
                align="center"
                justify="center"
                cursor="pointer"
                onClick={() => onRetry(uf.id)}
                _hover={{ bg: "white" }}
                title="Retry upload"
              >
                <Icon as={RefreshCw} boxSize={3.5} color="gray.700" />
              </Flex>
            )}
          </Box>
        )}
      </Box>

      {/* ── Caption ── */}
      {isError && (
        <Box>
          <Text fontSize="xs" color="red.500" fontWeight="semibold" lineHeight="1.3">
            {isSizeError ? "Limit is exceeded" : (uf.errorMessage ?? "Upload failed")}
          </Text>
          {isSizeError ? (
            <Text
              fontSize="xs"
              color="blue.500"
              fontWeight="semibold"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
              onClick={() => onRemove(uf.id)}
            >
              Remove
            </Text>
          ) : (
            <Text
              fontSize="xs"
              color="blue.500"
              fontWeight="semibold"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
              onClick={() => onRetry(uf.id)}
            >
              Retry
            </Text>
          )}
        </Box>
      )}

      {isUploading && (
        <Box>
          <Flex align="center" gap={1} mb="4px">
            <Text fontSize="xs" fontWeight="bold" color="gray.700">
              {uf.progress}%
            </Text>
            <Text fontSize="xs" color="gray.400">
              {Math.round((uf.progress / 100) * uf.sizeMb)}/{uf.sizeMb} Mb
            </Text>
          </Flex>
          <BaseProgress
            value={uf.progress}
            colorScheme={uf.sizeMb > uf.maxSizeMb * 0.9 ? "orange" : "blue"}
          />
        </Box>
      )}

      {isDone && (
        <Box overflow="hidden">
          <Text fontSize="xs" fontWeight="bold" color="gray.800">
            {uf.file.name}
          </Text>
          <Text fontSize="xs" color="gray.400">
            {uf.sizeMb} Mb
          </Text>
        </Box>
      )}
    </Flex>
  );
};

// ─── Upload button cell ───────────────────────────────────────────────────────
const UploadButtonCell: React.FC<{
  onFiles: (files: File[]) => void;
  multiple: boolean;
  accept: string[];
  maxSizeMb: number;
}> = ({ onFiles, multiple, accept, maxSizeMb }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    onFiles(multiple ? picked : picked.slice(0, 1));
    e.target.value = "";
  };

  return (
    <Flex direction="column" gap={1} w="full" minW={0}>
      <Box
        position="relative"
        w="full"
        pt="75%"
        borderRadius="lg"
        border="2px solid"
        borderColor="blue.400"
        bg="white"
        cursor="pointer"
        transition="background 0.15s"
        _hover={{ bg: "blue.50" }}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept.join(",")}
          style={{ display: "none" }}
          onChange={handleChange}
        />
        <Flex
          position="absolute"
          inset={0}
          direction="column"
          align="center"
          justify="center"
          gap={1}
        >
          <Icon as={Upload} boxSize={5} color="blue.500" />
          <Text fontSize="xs" color="gray.600" fontWeight="medium">
            Upload image
          </Text>
        </Flex>
      </Box>
      <Text fontSize="xs" color="gray.400" lineHeight="1.4">
        Max size-{maxSizeMb}Mb.
        <br />
        Jpg, Png, Gif
      </Text>
    </Flex>
  );
};

// ─── File grid ────────────────────────────────────────────────────────────────
const FileGrid: React.FC<{
  files: UploadedFile[];
  onRemove: (id: string) => void;
  onAbort: (id: string) => void;
  onRetry: (id: string) => void;
  onFiles: (files: File[]) => void;
  multiple: boolean;
  accept: string[];
  maxSizeMb: number;
  columns: number | number[];
  uploadButtonPosition?: "start" | "end";
}> = ({
  files,
  onRemove,
  onAbort,
  onRetry,
  onFiles,
  multiple,
  accept,
  maxSizeMb,
  columns,
  uploadButtonPosition = "end",
}) => {
  const templateColumns = Array.isArray(columns)
    ? columns.map((c) => `repeat(${c}, 1fr)`)
    : `repeat(${columns}, 1fr)`;

  const uploadBtn = (
    <UploadButtonCell
      onFiles={onFiles}
      multiple={multiple}
      accept={accept}
      maxSizeMb={maxSizeMb}
    />
  );

  return (
    <Grid w="full" templateColumns={templateColumns} gap={3} alignItems="start">
      {uploadButtonPosition === "start" && uploadBtn}
      {files.map((uf) => (
        <ThumbnailCell
          key={uf.id}
          uf={uf}
          onRemove={onRemove}
          onAbort={onAbort}
          onRetry={onRetry}
        />
      ))}
      {uploadButtonPosition === "end" && uploadBtn}
    </Grid>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const UIFileUploadZone: React.FC<UIFileUploadZoneProps> = ({
  variant = "wide",
  multiple = false,
  accept = ["image/jpeg", "image/png", "image/gif"],
  maxSizeMb = 25,
  uploadFn,
  onChange,
  onUploadSuccess,
  onUploadError,
  columns = [2, 3, 5],
  simulateUploadMs = 60,
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  // ── Update a single file's fields in state ──────────────────────────────
  const updateFile = useCallback(
    (id: string, patch: Partial<UploadedFile>, latestFiles?: UploadedFile[]) => {
      setFiles((prev) => {
        const next = (latestFiles ?? prev).map((f) =>
          f.id === id ? { ...f, ...patch } : f
        );
        onChange?.(next);
        return next;
      });
    },
    [onChange]
  );

  // ── Real upload via injected uploadFn ───────────────────────────────────
  const startRealUpload = useCallback(
    async (entry: UploadedFile) => {
      const controller = new AbortController();

      // Store the controller so we can abort later
      setFiles((prev) => {
        const next = prev.map((f) =>
          f.id === entry.id ? { ...f, abortController: controller } : f
        );
        onChange?.(next);
        return next;
      });

      try {
        const url = await uploadFn!(
          entry.file,
          (percent) => {
            updateFile(entry.id, { progress: percent, state: "uploading" });
          },
          controller.signal
        );

        const done: Partial<UploadedFile> = {
          progress: 100,
          state: "done",
          uploadedUrl: url,
          abortController: undefined,
        };
        updateFile(entry.id, done);

        // Fire success callback with latest data
        setFiles((prev) => {
          const found = prev.find((f) => f.id === entry.id);
          if (found) onUploadSuccess?.({ ...found, ...done });
          return prev;
        });
      } catch (err: unknown) {
        const aborted =
          err instanceof Error && err.name === "AbortError";

        const reason: UploadErrorReason = aborted ? "aborted" : "api_error";
        const message =
          aborted
            ? "Upload cancelled"
            : err instanceof Error
            ? err.message
            : "Upload failed";

        const errorPatch: Partial<UploadedFile> = {
          state: "error",
          errorReason: reason,
          errorMessage: message,
          abortController: undefined,
        };

        updateFile(entry.id, errorPatch);

        setFiles((prev) => {
          const found = prev.find((f) => f.id === entry.id);
          if (found) onUploadError?.({ ...found, ...errorPatch }, reason);
          return prev;
        });
      }
    },
    [uploadFn, updateFile, onUploadSuccess, onUploadError, onChange]
  );

  // ── Simulated upload (dev / no uploadFn) ────────────────────────────────
  const startSimulatedUpload = useCallback(
    (id: string) => {
      let progress = 0;
      const tick = () => {
        progress = Math.min(progress + Math.floor(Math.random() * 10) + 3, 100);
        updateFile(id, {
          progress,
          state: progress === 100 ? "done" : "uploading",
        });
        if (progress < 100) setTimeout(tick, simulateUploadMs);
      };
      setTimeout(tick, simulateUploadMs);
    },
    [simulateUploadMs, updateFile]
  );

  // ── Add files ────────────────────────────────────────────────────────────
  const addFiles = useCallback(
    (incoming: File[]) => {
      const entries: UploadedFile[] = incoming.map((file) => {
        const sizeMb = toMb(file.size);
        const exceeded = sizeMb > maxSizeMb;
        return {
          id: genId(),
          file,
          preview: URL.createObjectURL(file),
          progress: 0,
          state: exceeded ? "error" : "uploading",
          errorReason: exceeded ? "size_exceeded" : undefined,
          errorMessage: exceeded ? `File exceeds ${maxSizeMb}MB limit` : undefined,
          sizeMb,
          maxSizeMb,
        };
      });

      setFiles((prev) => {
        const next = multiple ? [...prev, ...entries] : entries;
        onChange?.(next);
        return next;
      });

      // Start upload for valid files
      entries.forEach((entry) => {
        if (entry.state !== "error") {
          if (uploadFn) {
            startRealUpload(entry);
          } else {
            startSimulatedUpload(entry.id);
          }
        }
      });
    },
    [maxSizeMb, multiple, onChange, uploadFn, startRealUpload, startSimulatedUpload]
  );

  // ── Remove ───────────────────────────────────────────────────────────────
  const removeFile = useCallback(
    (id: string) => {
      setFiles((prev) => {
        // Abort if still uploading
        const target = prev.find((f) => f.id === id);
        target?.abortController?.abort();

        // Revoke object URL to free memory
        if (target?.preview) URL.revokeObjectURL(target.preview);

        const next = prev.filter((f) => f.id !== id);
        onChange?.(next);
        return next;
      });
    },
    [onChange]
  );

  // ── Abort (cancel in-flight upload, keep item in list as error) ──────────
  const abortFile = useCallback((id: string) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      target?.abortController?.abort();
      return prev; // state update happens in startRealUpload catch
    });
  }, []);

  // ── Retry ────────────────────────────────────────────────────────────────
  const retryFile = useCallback(
    (id: string) => {
      setFiles((prev) => {
        const target = prev.find((f) => f.id === id);
        if (!target) return prev;

        const reset: UploadedFile = {
          ...target,
          state: "uploading",
          progress: 0,
          errorReason: undefined,
          errorMessage: undefined,
          abortController: undefined,
        };

        const next = prev.map((f) => (f.id === id ? reset : f));
        onChange?.(next);

        // Kick off upload after state is set
        setTimeout(() => {
          if (uploadFn) {
            startRealUpload(reset);
          } else {
            startSimulatedUpload(id);
          }
        }, 0);

        return next;
      });
    },
    [onChange, uploadFn, startRealUpload, startSimulatedUpload]
  );

  // ── Shared grid props ────────────────────────────────────────────────────
  const gridProps = {
    files,
    onRemove: removeFile,
    onAbort: abortFile,
    onRetry: retryFile,
    onFiles: addFiles,
    multiple,
    accept,
    maxSizeMb,
    columns,
  };

  // ── WIDE variant ─────────────────────────────────────────────────────────
  if (variant === "wide") {
    return (
      <Flex direction="column" gap={4} w="full">
        {(multiple || files.length === 0) && (
          <WideDropZone onFiles={addFiles} multiple={multiple} accept={accept} />
        )}
        {files.length > 0 && (
          <Box
            w="full"
            border="2px dashed"
            borderColor="blue.100"
            borderRadius="xl"
            p={4}
          >
            <FileGrid
              {...gridProps}
              uploadButtonPosition={multiple ? "start" : "end"}
            />
          </Box>
        )}
      </Flex>
    );
  }

  // ── COMPACT variant ───────────────────────────────────────────────────────
  return (
    <Box
      w="full"
      border="2px dashed"
      borderColor="blue.100"
      borderRadius="xl"
      p={4}
    >
      <FileGrid {...gridProps} uploadButtonPosition="end" />
    </Box>
  );
};

export default UIFileUploadZone;


// ─── USAGE EXAMPLES ──────────────────────────────────────────────────────────
/*
// ── 1. Tanpa uploadFn — pakai simulated progress (untuk development) ──────────
<UIFileUploadZone
  variant="wide"
  multiple
  maxSizeMb={25}
  onChange={(files) => console.log(files)}
/>

// ── 2. Dengan Axios ───────────────────────────────────────────────────────────
import axios from "axios";
import type { UploadFn } from "./UIFileUploadZone";

const axiosUpload: UploadFn = async (file, onProgress, signal) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post("/api/upload", formData, {
    onUploadProgress: (e) =>
      onProgress(Math.round((e.loaded / (e.total ?? 1)) * 100)),
    signal,
  });

  return res.data.url; // string yang disimpan di uploadedFile.uploadedUrl
};

<UIFileUploadZone
  variant="compact"
  multiple
  maxSizeMb={25}
  uploadFn={axiosUpload}
  onUploadSuccess={(file) => console.log("✅ uploaded:", file.uploadedUrl)}
  onUploadError={(file, reason) => console.error("❌ failed:", reason)}
  onChange={(files) => console.log("all files:", files)}
/>

// ── 3. Dengan fetch ───────────────────────────────────────────────────────────
const fetchUpload: UploadFn = async (file, _onProgress, signal) => {
  const formData = new FormData();
  formData.append("file", file);

  // Note: fetch tidak support onUploadProgress natively
  // untuk progress tracking pakai axios atau XMLHttpRequest
  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    signal,
  });

  if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
  const data = await res.json();
  return data.url;
};

// ── 4. Dengan XMLHttpRequest (support progress + abort) ───────────────────────
const xhrUpload: UploadFn = (file, onProgress, signal) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText).url);
      } else {
        reject(new Error(`Upload failed: ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error("Network error"));

    signal.addEventListener("abort", () => {
      xhr.abort();
      reject(Object.assign(new Error("AbortError"), { name: "AbortError" }));
    });

    xhr.open("POST", "/api/upload");
    xhr.send(formData);
  });

// ── 5. Dengan React Hook Form + Zod ──────────────────────────────────────────
const schema = z.object({
  images: z
    .array(z.custom<UploadedFile>((v) => v?.state === "done"))
    .min(1, "Upload at least 1 image"),
});

const { setValue, watch, formState: { errors } } = useForm<z.infer<typeof schema>>();

<UIFileUploadZone
  variant="compact"
  multiple
  uploadFn={axiosUpload}
  onChange={(files) =>
    setValue("images", files, { shouldValidate: true })
  }
/>
{errors.images && (
  <Text color="red.500" fontSize="sm">{errors.images.message}</Text>
)}
*/