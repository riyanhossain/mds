export default (S) =>
  S.list()
    .title("Documents")
    .items([
      S.listItem()
        .title("Settings")
        .child(S.document().schemaType("settings").documentId("settings")),
      ...S.documentTypeListItems().filter((listItem) => {
        return !["settings"].includes(listItem.getId());
      }),
    ]);
