export enum EdgeStage {
  Apply,
  Locking,
  Result
}
let currentTimestamp = new Date();
const LockingTime = new Date();
export const setCurrentTimestamp = (timeStamp: Date) =>
  (currentTimestamp = timeStamp);
// export const getCurrentEdgeStage =
