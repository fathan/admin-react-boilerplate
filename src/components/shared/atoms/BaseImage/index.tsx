import { Image, Skeleton, Portal, useDisclosure, Dialog } from "@chakra-ui/react";

import { memo, useEffect, useRef, useState } from "react";

type BaseImageProps = React.ComponentProps<typeof Image> & {
  src: string;
  alt?: string;
  isRounded?: boolean;
  fallbackSrc?: string;
  lazy?: boolean;
  zoomable?: boolean;
  retryCount?: number;
};

const BaseImage = memo(
  ({
    src,
    alt = "image",
    isRounded = false,
    fallbackSrc = "https://via.placeholder.com/400",
    lazy = true,
    zoomable = false,
    retryCount = 2,
    objectFit = "cover",
    ...props
  }: BaseImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [retry, setRetry] = useState(0);

    const observerRef = useRef<HTMLImageElement | null>(null);

    const { open, onOpen, onClose } = useDisclosure();

    // ✅ Lazy Observer
    useEffect(() => {
      if (!lazy) {
        setIsLoaded(true);
        return;
      }

      const observer = new IntersectionObserver(([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      });

      if (observerRef.current) observer.observe(observerRef.current);

      return () => observer.disconnect();
    }, [lazy]);

    const handleError = () => {
      if (retry < retryCount) {
        setRetry((prev) => prev + 1);
        return;
      }

      setIsError(true);
    };

    const finalSrc =
      isError
        ? fallbackSrc
        : !isLoaded && lazy
        ? fallbackSrc
        : `${src}?r=${retry}`;

    return (
      <>
        {/* Thumbnail */}
        <Skeleton loading={!isLoaded && lazy}>
          <Image
            ref={observerRef}
            src={finalSrc}
            alt={alt}
            objectFit={objectFit}
            cursor={zoomable ? "zoom-in" : "default"}
            onClick={zoomable ? onOpen : undefined}
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
            borderRadius={isRounded ? "full" : props.borderRadius ?? "md"}
            {...props}
          />
        </Skeleton>

        {/* Zoom Dialog */}
        {zoomable && (
          <Portal>
            <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
              <Dialog.Trigger />
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content bg="transparent" shadow="none">
                  <Dialog.Body display="flex" justifyContent="center">
                    <Image
                      src={isError ? fallbackSrc : src}
                      alt={alt}
                      maxH="85vh"
                      objectFit="contain"
                    />
                  </Dialog.Body>
                </Dialog.Content>
              </Dialog.Positioner>
            </Dialog.Root>
          </Portal>
        )}
      </>
    );
  }
);

BaseImage.displayName = "BaseImage";

export default BaseImage;