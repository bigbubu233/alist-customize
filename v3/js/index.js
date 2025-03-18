let footer = false;

const footerStyle = `
  .footer {
    padding-bottom: 10px;
    padding-top: 10px;
    display: flex !important;
  }
  .mio-footer-main {
    font-size: 14px;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-wrap: wrap;
    gap: 12px 20px;
    justify-content: center;
    width: 100%;
  }
  .mio-footer-main > img {
    width: 18px !important;
    height: 18px !important;
    border-radius: 50%;
  }
  .mio-footer-main > a {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
  }
  .mio-footer-main > span {
    display: none; /* 移除竖线分隔符 */
  }

  @media (max-width: 768px) {
    .mio-footer-main {
      gap: 10px;
      justify-content: flex-start;
    }
    .mio-footer-main > a {
      flex: 0 0 calc(50% - 10px);
      max-width: calc(50% - 10px);
    }
  }

  @media (max-width: 480px) {
    .mio-footer-main > a {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }

  .markdown-body li>p {
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 0px;
  }
`;

// 保持原有 onPatchStyle 和 onCreateElement 函数不变

const renderFooter = (data) => {
  const target = document.querySelector(".footer > div");
  if (target) {
    onPatchStyle(footerStyle);
    target.innerHTML = "";
    target.classList.add("mio-footer-main");
    if (data?.length) {
      data.forEach((item, index) => {
        const { url: href, text, icon, target: aTarget } = item;
        const linkWrapper = document.createElement("div"); // 新增包裹容器
        
        const aDom = onCreateElement("a", { 
          target: aTarget || null, 
          href,
          style: "display: flex; align-items: center; gap: 5px;" // 添加内联样式
        });
        
        const ImgDom = icon ? onCreateElement("img", {
          src: `https://cdn.jsdelivr.net/gh/bigbubu233/picx-images-hosting/20250310/favicon.13lxe04uav.ico`,
          style: "flex-shrink: 0;" // 防止图片压缩
        }) : null;

        aDom.innerText = text;
        
        if (ImgDom) {
          aDom.insertBefore(ImgDom, aDom.firstChild);
        }
        
        linkWrapper.appendChild(aDom);
        target.appendChild(linkWrapper);
      });
    }
    footer = true;
  }
};

// 保持原有 init 函数不变

const init = () => {
  const footerDataDom = document.querySelector("#footer-data");
  if (footerDataDom) {
    let footerData = JSON.parse(
      document.querySelector("#footer-data").innerText
    );
    let count = 0;
    const interval = setInterval(() => {
      if (footer || count > 10) clearInterval(interval);
      ++count;
      renderFooter(footerData);
    }, 300);
  }
  // const navHome = document.querySelector(".hope-c-PJLV-ibMsOCJ-css");
  // if (navHome) {
  //   navHome.innerHTML = "✨";
  // }
};

init();
