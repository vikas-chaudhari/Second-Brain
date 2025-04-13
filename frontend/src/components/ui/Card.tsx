import DocumentIcon from "../icons/DocumentIcon";
import ShareIcon from "../icons/ShareIcon";
import DeleteIcon from "../icons/DeleteIcon";
import Badge from "./Badge";
import TwitterIcon from "../icons/svgrepo/TwitterIcon";
import YoutubeIcon from "../icons/svgrepo/YoutubeIcon";
import LinkIcon from "../icons/LinkIcon";
import axios from "axios";

const contentType = {
  tweet: <TwitterIcon />,
  video: <YoutubeIcon />,
  document: <DocumentIcon />,
  link: <LinkIcon />,
};

interface Tag {
  title: string;
  _id?: string;
}

interface Card {
  _id: string;
  type: "tweet" | "video" | "document" | "link";
  link: string;
  title: string;
  tags: [Tag];
  createdAt: string;
}

const Card = (props: Card) => {
  const formatDate = (timestamp: string | number): string => {
    const date = new Date(timestamp); // Parse timestamp
    return date.toLocaleString("en-US", {
      weekday: "long", // e.g., "Monday"
      year: "numeric", // e.g., "2024"
      month: "long", // e.g., "November"
      day: "numeric", // e.g., "25"
      hour: "2-digit", // e.g., "10 AM"
      minute: "2-digit",
    });
  };

  const deleteHandler = async (id: string) => {
    alert(id);
    await axios.delete(
      "http://localhost:3000/api/v1/user/delete-content/" + id,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  };

  const shareHandler = async (id: string) => {
    alert(id);
    // await axios.(
    //   "http://localhost:3000/api/v1/user/delete-content/" + id,
    //   {
    //     headers: {
    //       Authorization: localStorage.getItem("token"),
    //     },
    //   }
    // );
  };

  return (
    <div className="border-[1px] flex flex-col rounded-md border-slate-200 bg-white w-96 p-2">
      <div className="flex justify-between items-center">
        <div>{contentType[props.type]}</div>
        <div className="text-2xl text-slate-700">{props.title}</div>
        <div className="flex justify-center items-center gap-3">
          <div
            // @ts-ignore
            onClick={() => shareHandler(props._id)}
            className="flex items-center size-5 text-gray-500 cursor-pointer hover:text-purple-600"
          >
            <ShareIcon />
          </div>
          <div
            // @ts-ignore
            onClick={() => deleteHandler(props._id)}
            className="flex size-5 items-center text-gray-500 cursor-pointer hover:text-red-700"
          >
            <DeleteIcon />
          </div>
        </div>
      </div>
      <div className="rounded-md my-2 overflow-hidden">
        {props.type === "video" && (
          <iframe
            className="w-full"
            src={props.link
              .replace("watch?v=", "embed/")
              .replace("youtube.com", "youtube-nocookie.com")}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            // referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-same-origin allow-scripts allow-presentation"
            loading="lazy"
            allowFullScreen
          ></iframe>
        )}
        {/* Twitter Embed */}
        {props.type === "tweet" && (
          <>
            <blockquote className="twitter-tweet">
              <a
                target="_blank"
                href={props.link.replace("x.com", "twitter.com")}
              ></a>
            </blockquote>
            <script
              async
              src="https://platform.twitter.com/widgets.js"
              charSet="utf-8"
            ></script>
          </>
        )}
      </div>
      <div className="flex gap-2 my-2">
        {props.tags.map((tag) => (
          <Badge key={tag._id} title={tag.title} />
        ))}
      </div>
      <div className="text-gray-400">
        Added on {formatDate(props.createdAt)}
      </div>
    </div>
  );
};

export default Card;
