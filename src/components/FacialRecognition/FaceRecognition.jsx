import * as faceapi from "face-api.js";

export class FaceRecognition {
    async loadModels() {
        const modelsPath = "/models";
        await Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri(modelsPath),
        faceapi.nets.faceLandmark68Net.loadFromUri(modelsPath),
        faceapi.nets.ssdMobilenetv1.loadFromUri(modelsPath)
        ]);
    }
    async getScore(imgSrc){
        const img =new Image();
        img.src = imgSrc;
        const detection = await faceapi.detectSingleFace(img)
        .withFaceLandmarks().withFaceDescriptor();
        if(detection)return detection.detection.score;
        else return 0;
    }

    async getLabeledFaceDetections(images){
        let result = [];
        for(let i=0; i<images.length; i++){
            const img =new Image();
            img.src = images[i];
            const detection = await faceapi.detectSingleFace(img)
            .withFaceLandmarks().withFaceDescriptor();
            if(detection){
                let des = Array.from(detection.descriptor);
                result.push(JSON.stringify(des));
            }
        }
        return result;
    }
    async  faceRecognizer(labeleddescriptors, video, timeoutMs) {
      const labeledFaceDescriptors = labeleddescriptors.map((desc) => ({
        email: desc.email,
        descriptors: desc.descriptors.map((descItem) => new Float32Array(JSON.parse(descItem))),
      }));
    
      const LabeledFaceDescriptors = labeledFaceDescriptors.map((desc) => {
        return new faceapi.LabeledFaceDescriptors(desc.email, desc.descriptors);
      });
      const canvas = faceapi.createCanvas(video);
      document.body.append(canvas);
      const faceMatcher = new faceapi.FaceMatcher(LabeledFaceDescriptors);
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);
      console.log(LabeledFaceDescriptors);
    
      const user = await new Promise((resolve) => {
        const results = [];
    
        const interval = setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video)
            .withFaceLandmarks()
            .withFaceDescriptors();
    
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
    
          const currentResults = await Promise.all(resizedDetections.map(async (d) => {
            return faceMatcher.findBestMatch(d.descriptor);
          }));
    
          console.log("unfilteredResults", currentResults);
    
          // Filter out "unknown" elements
          const filteredResults = currentResults.filter((element) => element.label !== 'unknown');
          console.log("Filtered results", filteredResults);
    
          if (filteredResults.length > 0) {
            results.push(...filteredResults);
          }
    
          if (Date.now() >= timeoutMs) {
            console.log("Results", results);
    
            // Clear the interval
            clearInterval(interval);
    
            // Return the best result after the specified timeout
            if (results.length > 0) {
              const bestResult = results.reduce((prev, current) => {
                return prev._distance < current._distance ? prev : current;
              });
              resolve(bestResult);
            } else {
              // No valid results found within the timeout, resolve with null
              resolve(null);
            }
          }
        }, 400);
      });
    
      console.log("User: ", user);
      return user;
    }
      
}