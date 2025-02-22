import Image from "next/image";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";

import csvString from "./spreadsheet";

function convertToLikert(value: string) {
  switch (value) {
    case "Strongly Agree":
      return 4;
    case "Agree":
      return 3;
    case "Neutral":
      return 2;
    case "Disagree":
      return 1;
    case "Strongly Disagree":
      return 0;
  }
}

export default function Home() {
  const csvResults = Papa.parse(csvString, { header: true });
  const csvData = csvResults.data;
  console.log(csvData);
  const results = csvData.map((row) => {
    const q1 = convertToLikert(
      row["I think that I would like to use this system frequently."]
    );
    const q2 = convertToLikert(row["I found the system to be simple."]);
    const q3 = convertToLikert(row["I thought the system was easy to use."]);
    const q4 = convertToLikert(
      row[
        "I think that I could use the system without the support of a technical person."
      ]
    );
    const q5 = convertToLikert(
      row["I found the various functions in the system were well integrated."]
    );
    const q6 = convertToLikert(
      row["I thought there was a lot of consistency in the system."]
    );
    const q7 = convertToLikert(
      row[
        "I would imagine that most people would learn to use the system very quickly."
      ]
    );
    const q8 = convertToLikert(row["I found the system very intuitive."]);
    const q9 = convertToLikert(row["I felt very confident using the system."]);
    const q10 = convertToLikert(
      row["I could use the system without having to learn anything new."]
    );
    return {
      q1,
      q2,
      q3,
      q4,
      q5,
      q6,
      q7,
      q8,
      q9,
      q10,
    };
  });
  console.log(results);

  const summedResults = results.map((row) => {
    return Object.values(row).reduce((acc, curr) => acc + curr, 0);
  });
  console.log(summedResults);

  const susResults = summedResults.map((row) => {
    return row * 2.5;
  });
  console.log(susResults);

  const susMean = susResults.reduce((a, b) => a + b) / susResults.length;
  console.log(susMean);

  const susMin = Math.min(...susResults);
  const susMax = Math.max(...susResults);
  console.log(susMin, susMax);

  const susRange = susMax - susMin;
  console.log(susRange);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-20 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 pt-60 items-center">
        <h1 className="text-6xl font-semibold text-center w0.6 sm:w-0.8">
          System Usability Scale Calculator
        </h1>
        <p className="w-0.6 sm:w-0.8">
          The System Usability Scale (SUS) is a simple, ten-item scale used to
          quickly evaluate the usability of a system.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button>Upload CSV</Button>
          {/* <Button>Click me</Button> */}
        </div>
        <div className="flex flex-col gap-4 w-full p-4 items-center border border-solid rounded-xl border-gray-300">
          <div className="flex gap-2 items-start flex-col">
            <div className="flex gap-2">
              <p>Average SUS score:</p>
              <p>{susMean}</p>
            </div>
            <div className="flex gap-2">
              <p>Minimum SUS score:</p>
              <p>{susMin}</p>
            </div>
            <div className="flex gap-2">
              <p>Maximum SUS score:</p>
              <p>{susMax}</p>
            </div>
            <div className="flex gap-2">
              <p>Range:</p>
              <p>{susRange}</p>
            </div>

            <p>SUS Score by participant</p>
            {susResults.map((result, index) => (
              <div className="flex gap-2" key={index}>
                <p>{index + 1}:</p>
                <p>{result}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
