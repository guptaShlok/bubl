import Link from "next/link";
import Image from "next/image";

const googlePlayUrl =
  "https://play.google.com/store/apps/details?id=com.livableorb.livableorb&pcampaignid=web_share";
const appStoreUrl = "https://apps.apple.com/in/app/bubl/id1560677171";

export default function AppStoreLinks() {
  return (
    <div
      className={`flex md:flex-wrap w-full z-20 justify-start relative items-center gap-4`}
    >
      {/* Google Play Button */}
      <Link
        href={googlePlayUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get it on Google Play"
      >
        <Image
          src="/GooglePlay.png"
          alt="Get it on Google Play"
          width={180}
          height={53}
          className="h-auto w-auto scale-75 md:scale-100"
        />
      </Link>

      {/* App Store Button */}
      <Link
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on the App Store"
      >
        <Image
          src="/AppStore.png"
          alt="Download on the App Store"
          width={180}
          height={53}
          className="h-auto w-auto scale-75 md:scale-100"
        />
      </Link>
    </div>
  );
}
