// 图片上传云储存，换取https链接
export const uploadImage = async(cloudPath,path = 0)=>{
	let fileFormat = cloudPath.split(".");
	let newCode = `${new Date().getTime()}${"."}${fileFormat[fileFormat.length - 1]}`;
	const res = await wx.cloud.uploadFile({
	  cloudPath:path === 0 ? newCode : path + newCode,
	  filePath:cloudPath, // 文件路径
	})
	const url = await wx.cloud.getTempFileURL({
	  fileList: [res.fileID]
	})
	return url.fileList[0].tempFileURL
}