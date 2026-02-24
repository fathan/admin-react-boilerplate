import BaseAvatar from "@/components/shared/atoms/BaseAvatar";

export default function DocMiscAvatar() {
  return (
    <>
      <div className="flex flex-row gap-6 items-center mb-10">
        <BaseAvatar src="https://i.pravatar.cc/150?img=1" name="John Doe" size="lg" status="online" />
        <BaseAvatar src="https://i.pravatar.cc/150?img=2" name="John Doe" size="lg" status="online" />
        <BaseAvatar src="https://i.pravatar.cc/150?img=3" name="John Doe" size="lg" status="online" />
        <BaseAvatar src="https://i.pravatar.cc/150?img=4" name="John Doe" size="lg" status="online" />
        <BaseAvatar src="https://i.pravatar.cc/150?img=5" name="John Doe" size="lg" status="online" />
      </div>

      <div className="flex flex-row gap-6 items-center mb-10">
        <BaseAvatar name="Jane Smith" size={20} status="away" />
        <BaseAvatar name="Jane Smith" size={30} status="away" />
        <BaseAvatar name="Jane Smith" size={40} status="away" />
        <BaseAvatar name="Jane Smith" size={50} status="away" />
        <BaseAvatar name="Jane Smith" size={60} status="away" />
      </div>

      <BaseAvatar />
    </>
  );
}