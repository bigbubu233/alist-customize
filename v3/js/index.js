/*
 * @Author: kasuie
 * @Date: 2024-04-24 15:35:59
 * @LastEditors: kasuie
 * @LastEditTime: 2024-11-05 09:38:54
 * @Description:
 */
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
  }
  .mio-footer-main > img {
    width: 18px !important;
    height: 18px !important;
    border-radius: 50%;
  }

  .mio-footer-main > a:hover {
    text-decoration: underline;
  }

  .markdown-body li>p {
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 0px;
  }
`;
const onPatchStyle = (style) => {
  const styleElement = document.createElement("style");
  styleElement.textContent = style;
  const head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(styleElement);
};

const onCreateElement = (tag, attrs) => {
  const dom = document.createElement(tag);
  if (attrs && typeof attrs == "object") {
    for (const key in attrs) {
      if (Object.hasOwnProperty.call(attrs, key) && attrs[key]) {
        dom.setAttribute(key, attrs[key]);
      }
    }
  }
  return dom;
};

const renderFooter = (data) => {
  const target = document.querySelector(".footer > div");
  if (target) {
    onPatchStyle(`
      ${footerStyle}
      .mio-footer-main svg {
        width: 18px;
        height: 18px;
        margin-right: 5px;
        vertical-align: middle;
        color: #666;
        transition: all 0.3s ease;
      }
      .mio-footer-main a:hover svg {
        color: #3273dc;
      }
    `);
    
    target.innerHTML = "";
    target.classList.add("mio-footer-main");
    
    if (data?.length) {
      data.forEach((item, index) => {
        const { url: href, text, icon, target: aTarget } = item;
        
        // 创建容器
        const linkWrapper = document.createElement("div");
        linkWrapper.style.display = "inline-flex";
        linkWrapper.style.alignItems = "center";
        linkWrapper.style.margin = "0 8px";

        // 添加 SVG
        if (icon) {
          const svgWrapper = document.createElement("div");
          svgWrapper.innerHTML = icon;
          const svg = svgWrapper.firstChild;
          svg.setAttribute("aria-hidden", "true");
          linkWrapper.appendChild(svg);
        }

        // 创建链接
        const aDom = document.createElement("a");
        aDom.href = href;
        aDom.target = aTarget || "_self";
        aDom.textContent = text;
        aDom.style.display = "flex";
        aDom.style.alignItems = "center";
        
        linkWrapper.appendChild(aDom);
        target.appendChild(linkWrapper);

        // 添加分隔线
        if (index < data.length - 1) {
          const split = document.createElement("span");
          split.style.margin = "0 8px";
          split.textContent = "|";
          target.appendChild(split);
        }
      });
    }
    footer = true;
  }
};

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
