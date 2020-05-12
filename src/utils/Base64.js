export class Base64
{
	static getMimetype(url)
	{
		let regex = /^data:(.+);base64,(.*)$/;
		let result = url.match(regex);
		return result[1];
	}

	static toFile(url)
	{
		let mimetype = Base64.getMimetype(url);
		let ext = mimetype.split('/')[1];
		let filename = `file_${Date.now()}.${ext}`;

		return fetch(url)
		.then(res=>{ return res.arrayBuffer(); })
		.then(buffer=>{ return new File([buffer], filename, { type: mimetype }); });
	}
}