import BaseImage from "@/components/shared/atoms/BaseImage";

const DocMiscImages = () => {
  return (
    <div className="space-y-6">
      <BaseImage
        src="https://i.pravatar.cc/300?img=4"
        alt="User avatar"
        boxSize="150px"
      />

      <BaseImage
        src="https://i.pravatar.cc/300?img=4"
        isRounded
        boxSize="120px"
      />

      <BaseImage
        src="https://wallpapercave.com/uwp/uwp4261619.png"
        aspectRatio={4 / 3}
        w="300px"
        h="200px"
        lazy
        zoomable
      />
      
      <BaseImage
        src="https://wallpapercave.com/uwp/uwp4261619.png"
        aspectRatio={4 / 3}
        w="300px"
        h="200px"
        zoomable
      />
    </div>
  );
};

export default DocMiscImages;
