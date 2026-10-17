import { processPDFs } from './pdf.js';
self.onmessage = async ({ data }) => {
  try {
    const result = await processPDFs(data, (progress) => self.postMessage({ progress }));
    self.postMessage({ result }, [result.bytes.buffer]);
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
