import { BlobServiceClient } from '@azure/storage-blob';

const account = import.meta.env.VITE_EXCEL_BLOB_ACCOUNT_NAME;
const sas = import.meta.env.VITE_EXCEL_BLOB_SAS_TOKEN;

class BlobClient {
  constructor() {
    this.blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net${sas}`);
    this.containerClient = this.blobServiceClient.getContainerClient('changelog');
  }

  async listBlobs({ prefix = '/' } = {}) {
    let ret = [];
    const iter = this.containerClient.listBlobsFlat({ prefix, includeMetadata: true });
    for await (const item of iter) {
      ret.push(item);
    }

    return ret;
  }

  getImageLink(name) {
    return `https://${account}.blob.core.windows.net/changelog/${name}${sas}`;
  }
}

export default new BlobClient();
