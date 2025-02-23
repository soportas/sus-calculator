"use client";

import { useState } from "react";
import Papa, { ParseResult } from "papaparse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// import csvString from "./spreadsheet";

function convertToLikert(value: string): number {
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
    default:
      return 0;
  }
}

interface ResultRow {
  [index: string]: string;
}

interface SumResultRow {
  [index: string]: number;
}

export default function Home() {
  const [file, setFile] = useState<File | undefined>();
  const [csvData, setCsvData] = useState<ResultRow[] | undefined>();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      const target = e.target as HTMLInputElement;

      if (target.files) {
        setFile(target.files[0]);
      }
    }
  };

  const handleOnSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (file) {
      Papa.parse(file, {
        header: true,
        complete: function (results: ParseResult<ResultRow>) {
          const data: ResultRow[] = results.data;
          setCsvData(data);
        },
      });
    }
  };

  // const csvResults = Papa.parse(csvString, { header: true });
  // const testData = csvResults.data;

  const results: SumResultRow[] = [];
  if (csvData) {
    for (let i = 0; i < csvData.length; i++) {
      const row = csvData[i] as ResultRow;
      if (row["ID"]) {
        const q1 = convertToLikert(
          row["I think that I would like to use this system frequently."]
        );
        const q2 = convertToLikert(row["I found the system to be simple."]);
        const q3 = convertToLikert(
          row["I thought the system was easy to use."]
        );
        const q4 = convertToLikert(
          row[
            " I think that I could use the system without the support of a technical person."
          ]
        );
        const q5 = convertToLikert(
          row[
            "I found the various functions in the system were well integrated."
          ]
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
        const q9 = convertToLikert(
          row["I felt very confident using the system."]
        );
        const q10 = convertToLikert(
          row["I could use the system without having to learn anything new."]
        );

        results.push({
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
        });
      }
    }
  }

  // console.log("uploadedresults");
  // console.log(results);

  let summedResults: number[] = [];
  let susResults: number[] = [];
  let susMean = 0;
  let susMin = 0;
  let susMax = 0;
  let susRange = 0;

  if (results.length > 0) {
    summedResults = results.map((row) => {
      return Object.values(row).reduce((acc, curr) => acc + curr, 0);
    });
    // console.log("summedResults");
    // console.log(summedResults);

    susResults = summedResults.map((row) => {
      return row * 2.5;
    });
    // console.log("susResults");
    // console.log(susResults);

    susMean = susResults.reduce((a, b) => a + b) / susResults.length;
    // console.log(susMean);

    susMin = Math.min(...susResults);
    susMax = Math.max(...susResults);
    // console.log(susMin, susMax);

    susRange = susMax - susMin;
    // console.log(susRange);
  }

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-20 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-6xl font-semibold text-center w0.6 sm:w-0.8">
          System Usability Scale Calculator
        </h1>
        <div className="flex flex-col gap-2 items-center">
          <p className="w-0.6 sm:w-0.8">
            The System Usability Scale (SUS) is a simple, ten-item scale used to
            quickly evaluate the usability of a system.
          </p>
          <p className="w-0.6 sm:w-0.8">
            This tool calculates the SUS score for a positive SUS (designed by
            Sauro & Lewis, 2011).
          </p>
        </div>
        <div>
          <form className="flex gap-2 items-center">
            <Input
              id="csvFile"
              type="file"
              accept=".csv"
              onChange={handleOnChange}
            />
            <Button
              onClick={(e) => {
                handleOnSubmit(e);
              }}
            >
              Upload CSV
            </Button>
          </form>
        </div>
        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-4 w-full p-4 border border-solid rounded-xl border-gray-300">
            <h3 className="font-bold">SUS Score Summary</h3>
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
          </div>

          <div className="flex flex-col gap-4 w-full p-4 border border-solid rounded-xl border-gray-300">
            <h3 className="font-bold">SUS Score by participant</h3>
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
