export const getIssueFileName = (url: string) => {
  const documentName =
    decodeURI(url).split("/").pop()?.split("?")[0].split("%40").pop() || "";

  return documentName;
};
