export default function formatMatNo(matNo: string) {
  // Replace the / with _
  const matNo_ = matNo.replace(/\//g, "_");
  // Split the mat no into an array
  console.log(matNo_);
  return matNo_;
}
