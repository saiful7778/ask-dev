import { type Editor } from "@tiptap/react";
import {
  Bold,
  Braces,
  Code,
  CornerDownLeft,
  Heading2,
  Heading3,
  Heading4,
  Highlighter,
  Italic,
  Link,
  List,
  ListOrdered,
  Underline,
} from "lucide-react";
import { Separator } from "../shadcn/ui/separator";
import { Button } from "../shadcn/ui/button";
import ToolButton from "./ToolButton";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/ui/popover";
import { useCallback, useState } from "react";
import { Input } from "../shadcn/ui/input";
import toast from "react-hot-toast";

const Toolbar: React.FC<{ editor: Editor }> = ({ editor }) => {
  return (
    <div className="flex w-full items-center justify-start rounded-md border border-input bg-secondary p-1">
      <div className="flex items-center gap-1">
        <ToolButton
          isActive={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold />
        </ToolButton>
        <ToolButton
          isActive={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic />
        </ToolButton>
        <ToolButton
          isActive={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Underline />
        </ToolButton>
        <Separator orientation="vertical" className="h-6" />
        <ToolButton
          isActive={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code />
        </ToolButton>
        <ToolButton
          isActive={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Braces />
        </ToolButton>
        <ToolButton
          isActive={editor.isActive("highlight")}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          <Highlighter />
        </ToolButton>
        <LinkToolButton editor={editor} />
        <Separator orientation="vertical" className="h-6" />
        <ToolButton
          isActive={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List />
        </ToolButton>
        <ToolButton
          isActive={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered />
        </ToolButton>
        <Separator orientation="vertical" className="h-6" />
        <ToolButton
          isActive={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 />
        </ToolButton>
        <ToolButton
          isActive={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 />
        </ToolButton>
        <ToolButton
          isActive={editor.isActive("heading", { level: 4 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          <Heading4 />
        </ToolButton>
        <Separator orientation="vertical" className="h-6" />
        <Button
          size="icon"
          variant="ghost"
          type="button"
          aria-label="Toggle underline"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          <CornerDownLeft />
        </Button>
      </div>
    </div>
  );
};

const LinkToolButton: React.FC<{
  editor: Editor;
}> = ({ editor }) => {
  const [urlValue, setUrlValue] = useState<string>("");
  const [openLinkDialog, setOpenLinkDialog] = useState<boolean>(false);

  const handleSetLink = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const previousUrl = editor.getAttributes("link").href;
      const url = urlValue || previousUrl;

      if (!url) {
        return;
      }

      // empty
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }

      // update link
      try {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: url })
          .run();
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Error setting link");
        }
      }
    },
    [editor, urlValue],
  );

  return (
    <Popover open={openLinkDialog} onOpenChange={setOpenLinkDialog}>
      <PopoverTrigger asChild>
        <ToolButton
          isActive={editor.isActive("link")}
          onClick={() => setOpenLinkDialog((prev) => !prev)}
        >
          <Link />
        </ToolButton>
      </PopoverTrigger>
      <PopoverContent className="bg-secondary">
        <form onSubmit={handleSetLink} className="flex flex-col gap-2">
          <Input
            type="url"
            placeholder="Enter url address"
            value={urlValue}
            className="h-9 rounded"
            onChange={(e) => setUrlValue(e.target.value)}
            required
          />
          <Button size="sm" className="rounded" type="submit">
            Add Link
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default Toolbar;
