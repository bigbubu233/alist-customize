let footer = false;

const footerStyle = `
  .footer {
    padding: 10px 0;
    display: flex !important;
    flex-wrap: wrap;
    justify-content: center;
  }

  .mio-footer-main {
    font-size: 14px;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    width: 100%;
  }

  .mio-footer-main .footer-item {
    display: flex;
    align-items: center;
    margin: 0 4px;
  }

  .mio-footer-main a {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px;
    min-height: 32px;
  }

  .mio-footer-main img {
    width: 18px !important;
    height: 18px !important;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .splitter {
    margin: 0 4px;
    color: #666;
    display: none;
  }

  @media (min-width: 769px) {
    .splitter {
      display: inline-block !important;
    }
  }

  @media (max-width: 768px) {
    .mio-footer-main {
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .footer-item {
      margin: 4px 0 !important;
    }
    .mio-footer-main a {
      padding: 8px;
    }
  }

  .mio-footer-main a:hover {
    text-decoration: underline;
    opacity: 0.9;
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
    onPatchStyle(footerStyle);
    target.innerHTML = "";
    target.classList.add("mio-footer-main");
    
    if (data?.length) {
      data.forEach((item, index) => {
        const { url: href, text, icon: iconUrl, target: aTarget } = item;

        // 创建链接项容器
        const itemContainer = onCreateElement("div", {
          class: "footer-item"
        });

        // 创建链接元素
        const aDom = onCreateElement("a", {
          target: aTarget || "_self",
          href: href,
          "aria-label": text
        });

        // 添加图标
        if (iconUrl) {
          aDom.appendChild(
            onCreateElement("img", {
              src: iconUrl,
              alt: `${text} icon`,
              loading: "lazy"
            })
          );
        }

        // 添加文字
        aDom.appendChild(document.createTextNode(text));

        // 组装元素
        itemContainer.appendChild(aDom);
        target.appendChild(itemContainer);

        // 添加桌面端分割线
        if (index < data.length - 1) {
          target.appendChild(
            onCreateElement("span", {
              class: "splitter",
              "aria-hidden": "true"
            })
          ).textContent = "|";
        }
      });
    }
    footer = true;
  }
};

const init = () => {
  const footerDataDom = document.querySelector("#footer-data");
  if (footerDataDom) {
    const footerData = JSON.parse(footerDataDom.innerText);
    let count = 0;
    const interval = setInterval(() => {
      if (footer || count > 10) clearInterval(interval);
      ++count;
      renderFooter(footerData);
    }, 300);
  }
};

// 添加移动端检测
const checkMobile = () => {
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.documentElement.classList.add("mobile");
  } else {
    document.documentElement.classList.add("desktop");
  }
};

// 初始化执行
checkMobile();
init();
