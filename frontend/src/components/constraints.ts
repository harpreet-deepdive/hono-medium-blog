import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import editorjsNestedChecklist from "@calumk/editorjs-nested-checklist";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile: async (file: File) => {
          console.log("file from", file);

          const formData = new FormData();
          formData.append("file", file);

          return axios
            .post(`${BACKEND_URL}/api/v1/images/upload`, formData)
            .then((res) => {
              console.log(res);

              return {
                success: 1,
                file: {
                  url: res.data.url,
                },
              };
            });
        },
      },
    },
  },
  raw: Raw,
  header: {
    class: Header,
    config: {
      placeholder: "Enter a header",
      levels: [2, 3, 4],
      defaultLevel: 1,
    },
  },
  quote: Quote,
  checklist: CheckList,
  nestedchecklist: editorjsNestedChecklist,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};
