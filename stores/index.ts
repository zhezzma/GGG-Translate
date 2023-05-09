


 
export function getDefaultSettings() {
    return {
      chatgpt: { enable: true, apiKey: '' ,system:'下面我让你来充当翻译家，你的目标是进行翻译，请翻译时不要带翻译腔，而是要翻译得自然、流畅和地道，使用优美和高雅的表达方式.当你翻译不了的时候,你就回答翻译失败.否则只返回翻译的结果'},
      ali: { enable: true, keyId: '', keySecret: '' },
      youdao: { enable: true, appKey: '', key: '' },
      baidu: { enable: true, appId: '', secret: '' },
      google: { enable: true, apiKey: '' },
      tencent: { enable: true, region: '', secretId: '', secretKey: '' },
      deepl: { enable: true, authKey: '' },
      volc: { enable: true, accessKey: '', secretKey: '' },
      bing: { enable: true }
    }
  }