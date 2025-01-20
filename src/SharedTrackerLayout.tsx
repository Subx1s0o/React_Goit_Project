import { ReactNode } from 'react';

export default function SharedTrackerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex h-screen min-h-[1396px] max-w-[375px] items-center p-4 font-poppins md:max-w-screen-md md:p-8 lg:max-w-screen-lg">
      <div className="flex min-h-[736px] w-full flex-col gap-4 lg:h-auto lg:flex-row">
        {children}
      </div>
    </div>
  );
}
