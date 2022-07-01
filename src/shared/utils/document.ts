export const documentDisabledScroll = () => {
  const scrollbar = window.innerWidth - document.body.clientWidth;

  const htmlElem = document.querySelector("html");
  if (htmlElem !== null) {
    htmlElem.style.overflowY = "hidden";
    htmlElem.style.marginRight = `${scrollbar}px`;
  }
};

export const documentEnabledScroll = () => {
  const htmlElem = document.querySelector("html");
  if (htmlElem !== null) {
    htmlElem.style.overflowY = "visible";
    htmlElem.style.marginRight = "0";
  }
};

export const documentScrollToTop = () => {
  document.body.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
