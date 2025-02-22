import Image from "next/image";
import Papa from "papaparse";

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
