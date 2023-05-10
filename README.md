# GGGT

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/zhezzma/GGG-Translate)

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## 已接入语种识别

* unicode识别，不涉及语义

* [Google Cloud Translation API detect](https://cloud.google.com/translate/docs/basic/detecting-language)

* [腾讯云 语种识别](https://cloud.tencent.com/document/api/551/15620) 这个是免费的还是和文本翻译共用免费额度不太清楚...

* 默认使用自动模式：  Google->腾讯云-> unicode，要快的话直接换unicode

## 已接入文本翻译

- [有道翻译](https://ai.youdao.com/DOCSIRMA/html/%E8%87%AA%E7%84%B6%E8%AF%AD%E8%A8%80%E7%BF%BB%E8%AF%91/API%E6%96%87%E6%A1%A3/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1-API%E6%96%87%E6%A1%A3.html)

- [百度通用翻译](http://api.fanyi.baidu.com/doc/21) 高级版100万字符免费额度

- [Google Cloud Translation API v2](https://cloud.google.com/translate/docs/basic/translating-text?hl=zh-cn) v2版本够用了，每月50万字符免费额度

- [腾讯云 文本翻译](https://cloud.tencent.com/document/api/551/15619) 500万字符免费额度

- [火山翻译](https://www.volcengine.com/docs/4640/130872) 每月200万字符

- [阿里翻译](https://help.aliyun.com/document_detail/96384.html) 每月100万字符

- [DeepL翻译](https://www.deepl.com/zh/pro#developer) 每月50万字符

- [ChatGPT翻译](https://platform.openai.com/docs/introduction)

- [Bing翻译](https://cn.bing.com/translator/)

## 密钥申请方式

- https://bobtranslate.com/service/