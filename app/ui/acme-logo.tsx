import LanguageIcon from '@mui/icons-material/Language';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <LanguageIcon className="h-10 w-10 rotate-[15deg]" />
      <p className="text-[32px] ">InternTrack</p>
    </div>
  );
}
