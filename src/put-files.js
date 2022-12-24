// import process from 'process'
// import minimist from 'minimist'
// import { getFilesFromPath } from 'web3.storage'
import { Web3Storage } from 'web3.storage'

export default async function putFiles () {
//   const args = minimist(process.argv.slice(2))
  // const token = process.env['API_KEY']
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgyZWY1MzEyMDg0MTY4MkMxRjNhNjg3YzNmNzE3MTVCNTlFRDk3Y2UiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzE2MTk3OTAxMzcsIm5hbWUiOiJGaXJzdF9JUEZTX1Byb2plY3QifQ.r0vAnXmhBB_fm408oD9a3X-bSzHZJCZ3KfvX0Ha4jeU"

  const storage = new Web3Storage({ token })
  // const files = []

  // const path = "C:\\Users\\Lenovo\\Desktop\\975727.jpg"
  // const pathFiles = await getFilesFromPath(path)
  // files.push(...pathFiles)
  // function getFiles () {
  const fileInput = document.querySelector('input[type="file"]')
    // return fileInput.files
  // }
  // console.log(`Uploading ${files.length} files`)
  const cid = await storage.put(fileInput.files)
  // console.log('Content added with CID:', cid)
  return cid;
}

// export default putFiles;
// putFiles()