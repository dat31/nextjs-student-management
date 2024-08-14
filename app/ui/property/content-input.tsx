import {
  BoldItalicUnderlineToggles,
  headingsPlugin,
  imagePlugin,
  InsertImage,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { ForwardedRef } from "react";

type Props = {
  ref: ForwardedRef<MDXEditorMethods>;
};

export default function ContentInput({ ref }: Props) {
  return (
    <>
      <MDXEditor
        ref={ref}
        contentEditableClassName="border border-input mt-4 h-104 overflow-y-scroll"
        markdown="Content goes here..."
        plugins={[
          toolbarPlugin({
            toolbarContents() {
              return (
                <>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <ListsToggle />
                  <InsertImage />
                </>
              );
            },
          }),
          // Example Plugin Usage
          headingsPlugin(),
          imagePlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
        ]}
      />
    </>
  );
}
