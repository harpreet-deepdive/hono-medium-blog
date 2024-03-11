import { useState, useEffect } from "react";
import NProgress from "nprogress";
import Router from "next/router";

const useLoadingBar = (): [boolean, () => void, () => void] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startLoadingEffect = (): void => {
    setIsLoading(true);
  };
  const finishLoadingEffect = (): void => {
    setIsLoading(false);
    NProgress.done();
  };

  useEffect((): (() => void) => {
    if (isLoading) {
      // Progress bar will be rendered in first visible element with a
      // .fixed-loading-bar class or, if none exist, the page's body.
      const firstVisibleLoadingBarElement = Array.from(
        window.document.querySelectorAll(".fixed-loading-bar")
      ).filter(
        (s: Element) =>
          window.getComputedStyle(s).getPropertyValue("display") !== "none"
      )[0];
      const loadingBarParent = firstVisibleLoadingBarElement
        ? `.${firstVisibleLoadingBarElement?.classList?.value
            .split(" ")
            .slice(0, 2)
            .join(".")}`
        : "body";
      NProgress.configure({
        parent: loadingBarParent,
      });
      NProgress.start();
    }
    Router.events.on("routeChangeComplete", finishLoadingEffect);
    return () => {
      Router.events.off("routeChangeComplete", finishLoadingEffect);
    };
  }, [isLoading]);

  return [isLoading, startLoadingEffect, finishLoadingEffect];
};

export default useLoadingBar;
