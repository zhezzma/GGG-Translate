import sha256 from "crypto-js/sha256";




function S4(): string {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

function truncate(q: string): string {
	const len = q.length
	if (len <= 20) return q
	return q.substring(0, 10) + len + q.substring(len - 10, len)
}


export const youdao: TranslateText = async (text, from, to, conf) => {

	const salt = S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4()
	const curtime = Math.round(Date.now() / 1000)
	const sign = sha256(conf.appKey + truncate(text) + salt + curtime + conf.key).toString()

	const data = await $fetch("http://openapi.youdao.com/api", {
		query: {
			q: text,
			from: from,
			to: to,
			appKey: conf.appKey,
			salt: salt,
			sign: sign,
			signType: 'v3',
			curtime: curtime,
			ext: 'mp3',
		}
	}) as any;

	if (data.errorCode != 0) {
		throw createError({
			statusCode: 500,
			message: `发生了错误error_code:${data.errorCode}`,
		})
	}


	const obj = {} as Record<string, any>

	obj.text = data.translation.join('\n')
	obj.isWord = data.isWord
	obj.work_ext = { src_speak_url: data.speakUrl, dst_speak_url: data.tSpeakUrl }
	if (data.basic) {
		const basic = data.basic
		obj.work_ext.phonetic = basic.phonetic || ''
		obj.work_ext.explains = basic.explains || []
		if (basic['us-phonetic']) {
			obj.work_ext.us = {
				phonetic: basic['us-phonetic'],
				speech: basic['us-speech']
			}
		}
		if (basic['uk-phonetic']) {
			obj.work_ext.uk = {
				phonetic: basic['uk-phonetic'],
				speech: basic['uk-speech']
			}
		}
		if (basic.wfs) {
			obj.work_ext.wfs = basic.wfs.map((x: { wf: { name: string, value: string } }) => {
				return { name: x.wf.name, value: x.wf.value }
			})
		}
	}
	if (data.web) {
		obj.work_ext.web = data.web.map((x: { key: string, value: string }) => {
			return { name: x.key, list: x.value }
		})
	}

	return obj.text;
}


