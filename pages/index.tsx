export default function Home() {
  return (
    <main className="font-mono flex flex-col items-center justify-between p-24">
      <h1 className="font-bold text-6xl">Welcome to FWA</h1>
      <span>(my <i>first web application</i>)</span>

      <div className="mt-5">
        <h2 className="font-semibold text-3xl">Users:</h2>
        <ul>
          <li>✅ Full view with address</li>
          <li>✅ Fully implemented Edit</li>
          <li>✅ Fully implemented Delete with Confirmation</li>
          <li>✅ Fully implemented sorting by ALL columns</li>
        </ul>
      </div>

      <div className="mt-5">
        <h2 className="font-semibold text-3xl">Addresses:</h2>
        <ul>
          <li>✅ Full view with count of users</li>
          <li>✅ Fully implemented Edit</li>
          <li>✅ Fully implemented Delete with Confirmation</li>
          <li>✅ Fully implemented sorting by ALL columns</li>
        </ul>
      </div>

      <div className="flex flex-col items-center mt-8">
        <h2 className="font-semibold text-3xl">Powered by</h2>
        <ul className="flex flex-col items-center mt-1">
          <li>Next.js 13</li>
          <li>ASP.NET Core Web API</li>
          <li>Typescript</li>
          <li>Tailwindcss</li>
          <li>Flowbite</li>
        </ul>
      </div>
    </main>
  )
}
