import { FC, useCallback, useEffect, useRef } from "react";

import { createReactEditorJS } from "react-editor-js";

import { EDITOR_JS_TOOLS } from "./constraints";
import { Button } from "flowbite-react";
import { DataProp } from "editorjs-blocks-react-renderer";

const ReactEditorJS = createReactEditorJS();

interface EditorCore {
  destroy(): Promise<void>;

  clear(): Promise<void>;

  save(): Promise<DataProp>;

  render(data: DataProp): Promise<void>;
}

interface EditorProps {
  defaultData: DataProp;
  sendData: (savedData: object) => void;
}

const TailwindEditor: FC<EditorProps> = ({ defaultData, sendData }) => {
  const instanceRef = useRef<EditorCore | null>(null);

  async function handleSave() {
    if (instanceRef.current === null) return;
    const savedData = await instanceRef.current.save();

    sendData(savedData);
  }

  const handleInitialize = useCallback((instance: any) => {
    instanceRef.current = instance;
  }, []);
  return (
    <>
      <div className="border rounded-xl p-2 bg-gray-50 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700 ">
        <ReactEditorJS
          onInitialize={handleInitialize}
          tools={EDITOR_JS_TOOLS}
          i18n={{
            messages: {},
          }}
          defaultValue={defaultData}
        />
      </div>
      <Button className="mt-2" onClick={handleSave}>
        Save Content!
      </Button>
    </>
  );
};
export default TailwindEditor;
