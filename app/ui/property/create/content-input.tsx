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
import { ControllerRenderProps } from "react-hook-form";

type Props = {
  ref: ForwardedRef<MDXEditorMethods>;
  onBlur: (e: FocusEvent) => void;
} & Pick<ControllerRenderProps, "value">;

export default function ContentInput({ ref, onBlur, value }: Props) {
  return (
    <>
      <MDXEditor
        onBlur={onBlur}
        ref={ref}
        contentEditableClassName="border border-input mt-4 h-104 overflow-y-scroll"
        markdown={value}
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
