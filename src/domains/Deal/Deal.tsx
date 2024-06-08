import MoreDetailsButton from "components/MoreDetailsButton";
import ReactTooltip from "react-tooltip";
import { IDeal } from "./types";
import Card from "components/Card";
import { ShareIcon } from "@heroicons/react/outline";
import { trackClickEvent } from "utils";

type Props = {
  deal: IDeal;
};

const Deal = (props: Props) => {
  const { deal } = props;
  const imgUrl: string | undefined = process.env.NEXT_PUBLIC_IMAGE_URL;
  const metacriticUrl: string | undefined =
    process.env.NEXT_PUBLIC_METACRITIC_URL;
  const origin = window.location.origin;

  const handleCopyClick = (dealId: string) => {
    trackClickEvent("share-unsupported-browser");
    navigator.clipboard.writeText(`${origin}/deals/${dealId}`);
  };

  const handleShareClick = (deal: IDeal) => {
    trackClickEvent("share");
    navigator
      .share({
        url: `${origin}/deals/${deal.dealId}`,
        text: deal.title,
        title: deal.title,
      })
      .then(() => {
        trackClickEvent("share-successful");
      })
      .catch(() => {
        trackClickEvent("share-failed");
      });
  };

  return (
    <>
      <Card
        logo={
          <a
            href={`https://www.cheapshark.com/redirect?dealID=${deal.dealId}`}
            target="_blank"
            rel="noreferrer"
            className="w-full h-full"
          >
            <img
              alt={deal.title}
              src={deal.thumb}
              className="w-full h-full object-contain"
            />
          </a>
        }
      >
        <button className="inline-flex float-right absolute right-4 top-4">
          {!navigator.share ? (
            // fallback, in case navigator.share is not supported by the browser it copies to the clipboard instead.
            <>
              <ShareIcon
                className="h-5 w-5 text-gray-400 focus:outline-none"
                data-for={`copy-${deal.dealId}`}
                data-tip={"Copied!"}
                data-place="bottom"
                data-offset="{'top': 30, 'left': 20}"
                data-event="click"
                data-event-off="blur"
              />
              <ReactTooltip
                id={`copy-${deal.dealId}`}
                effect="float"
                afterShow={() => handleCopyClick(deal.dealId)}
              />
            </>
          ) : (
            <ShareIcon
              className="h-5 w-5 text-gray-400 focus:outline-none"
              onClick={() => handleShareClick(deal)}
            />
          )}
        </button>
        <h2 className="title-font font-medium text-lg text-textPrimary dark:text-textPrimary-dark font-bold md:mr-5">
          <a
            href={`https://www.cheapshark.com/redirect?dealID=${deal.dealId}`}
            target="_blank"
            rel="noreferrer"
          >
            {deal.title}
          </a>
        </h2>
        <div className="flex gap-2 items-center justify-center sm:justify-start">
          <h3 className="text-red-500 dark:text-red-700 line-through">
            ${deal.normalPrice.toFixed(2)}
          </h3>
          <h3 className="text-green-400 dark:text-green-500 font-semibold">
            {deal.salePrice !== 0 ? `$${deal.salePrice.toFixed(2)}` : "FREE"}
          </h3>

          <h3 className="text-white-700 text-white font-bold rounded-full bg-green-700 w-16 h-8 text-center p-1">
            -{deal.discountPercentage}%
          </h3>
        </div>
        <div>
          {deal.steamRatingText && (
            <p className="text-gray-500 dark:text-gray-400">
              Steam Rating: <span>{deal.steamRatingText}</span>
            </p>
          )}
          {deal.metacriticScore > 0 && (
            <p>
              <a
                target="_blank"
                rel="noreferrer"
                href={`${metacriticUrl}${deal.metacriticLink}`}
                className="text-link dark:text-link-dark font-medium"
              >
                Metacritic Score: {deal.metacriticScore}
                <svg
                  className="w-4 h-4 ml-2 mb-0 inline-block"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </p>
          )}
        </div>
        <div className="align-bottom flex items-center place-content-between">
          <MoreDetailsButton
            originId={deal.dealId}
            contentType={{ deal: true }}
          />
          <img
            className="rounded-lg w-8 h-8"
            data-for={deal.dealId}
            data-tip={`${deal.storeInfo?.storeName}`}
            data-place="top"
            data-offset="{'top': 30, 'left': 20}"
            alt={`Store: ${deal.storeInfo?.storeName}`}
            src={`${imgUrl}/${deal.storeInfo?.images.logo}`}
          />
          <ReactTooltip id={deal.dealId} effect="float" />
        </div>
      </Card>
    </>
  );
};

export default Deal;
