

export  async function translateText(translator: string, sourceText: string, langFrom: string, langTo: string,conf:any) {
  const runtimeConfig = useRuntimeConfig() 
  return await useFetch(`${runtimeConfig.public.apiBase}/translate_text`, {
    query: {
      translator: translator,
      text: sourceText,
      from: langFrom,
      to: langTo,
      config: encodeURIComponent(JSON.stringify(conf))
    }
  })
}


export  async function detectText( sourceText: string,conf:any) {
  const runtimeConfig = useRuntimeConfig() 
  return await useFetch(`${runtimeConfig.public.apiBase}/detect_lang`, {
    query: {
      text: sourceText,
      config:encodeURIComponent(JSON.stringify(conf))
    } 
  })
}


 
