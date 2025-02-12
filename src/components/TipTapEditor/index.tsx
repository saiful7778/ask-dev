"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import Spinner from "../Spinner";
import Toolbar from "./Toolbar";
import getAllExtensions from "./extensions";

const TiptapEditor: React.FC<{
  value: string;
  onValueChange: (inputText: string) => void;
  placeholder?: string | undefined;
}> = ({ value, onValueChange, placeholder }) => {
  const editor = useEditor({
    extensions: getAllExtensions(placeholder),
    content: value,
    editorProps: {
      attributes: {
        class:
          "h-[300px] tiptap-editor overflow-auto w-full rounded-md border border-input bg-secondary px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate({ editor }) {
      onValueChange(JSON.stringify(editor.getJSON()));
    },
  });

  if (!editor) {
    return (
      <div className="my-4 flex items-center justify-center">
        <Spinner size={22} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
