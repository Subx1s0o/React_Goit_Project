import Icon from '@/components/ui/Icon';

interface WaterItemProps {
  entry: { id: number; volume: number; time: string };
}

export default function WaterItem({ entry }: WaterItemProps) {
  return (
    <li className="flex items-center justify-start gap-[10px] rounded-2xl bg-white px-[14px] py-[18px] md:items-start md:gap-5 md:p-5">
      <div className="flex items-center justify-center">
        <Icon
          id="icon-water-glass"
          w={38}
          h={38}
          className="text-green md:h-[45px] md:w-11"
        />
      </div>
      <div className="flex w-[49px] flex-col items-start justify-center gap-1 md:h-[46px] md:w-[52px] md:gap-0">
        <p className="font-poppins text-base font-bold text-darkGrey md:text-ms">
          {entry.volume} ml
        </p>
        <p className="font-poppins text-sm font-normal text-darkGrey">
          {entry.time}
        </p>
      </div>
      <div className="flex flex-col items-start justify-center gap-2 md:gap-3.5">
        <button className="text-darkGrey md:size-4 lg:hover:text-green lg:focus:text-green">
          <Icon id="icon-edit" w={14} h={14} />
        </button>
        <button className="text-darkGrey md:size-4 lg:hover:text-green lg:focus:text-green">
          <Icon id="icon-trash" w={14} h={14} />
        </button>
      </div>
    </li>
  );
}