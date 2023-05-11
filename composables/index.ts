

export  function translateText(translator: string, sourceText: string, langFrom: string, langTo: string, requestId:string,conf: any) {
  const runtimeConfig = useRuntimeConfig()
  return  useFetch(`${runtimeConfig.public.apiBase}/translate_text`, {
    query: {
      translator: translator,
      text: sourceText,
      from: langFrom,
      to: langTo,
      requestId:requestId,
      config: encodeURIComponent(JSON.stringify(conf))
    }
  })
}


export  function detectText(sourceText: string, conf: any) {
  const runtimeConfig = useRuntimeConfig()
  return  useFetch(`${runtimeConfig.public.apiBase}/detect_lang`, {
    query: {
      text: sourceText,
      config: encodeURIComponent(JSON.stringify(conf))
    }
  })
}



