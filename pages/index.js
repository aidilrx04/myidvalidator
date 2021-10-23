import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { IDStoreProvider } from '../components/IDStore';
import InformationDetail from '../components/InformationDetail';
import ValidatorForm from '../components/ValidatorForm';

export default function Home()
{
  return (
    <div id="App">
      <HeadContent />
      <main id="content">
        <div className="text-center px-2 py-4">
          <h1 className="font-bold text-4xl">Malaysia ID Number Validator</h1>
          <p>
            <span>By </span>
            <a href="https://github.com/aidilrx04/" className="font-bold link">aidilrx04</a>
          </p>
          <div className='flex justify-center align-center px-1'>
            {/* <a href="/doc" className="link px-2">API</a> */ }
            <a href="https://github.com/aidilrx04/myidvalidator" className="px-2">
              <Image src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="Github Page" width={ 17 } height={ 17 } />
            </a>
          </div>
        </div>
        <div className="w-[600px] max-w-full mx-auto">
          <IDStoreProvider>
            <ValidatorForm />
            <InformationDetail />
          </IDStoreProvider>



          <div className="bg-white p-2 mb-2">
            <h4 className="font-bold">Keywords</h4>
            {
              [ 'Malaysia ID Number Validator',
                'Malaysia IC Number Validator',
                'ID Validator',
                'IC Validator' ].map( ( kw, i ) => (
                  <Link href="/" key={ i }>{ kw }</Link>
                ) ).map( ( i, _i ) => (
                  <div className="m-0 text-sm link" key={ _i }>{ i },</div>
                ) )
            }
          </div>

          <div className="mb-2 bg-white">
            <h4 className="font-bold text-center p-2">
              Disclaimer
            </h4>
            <p className="p-2 text-center text-sm">
              This site does not store any of the generated information.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white p-2 pb-20 mt-2 text-center">
        <h4 className="font-bold text-center">More Tools</h4>
        <a href="https://myidgenerator.vercel.app" className="link text-sm">Malaysia ID Number Generator</a>
      </footer>
    </div>
  );
}

function HeadContent()
{
  return (
    <Head>
      <title>Malaysia Identity Card Number Validator</title>
      <meta name="description" content="Malaysia Identity Card Number Validator" />
      <meta name="keywords" content="malaysia, ic, id, ic number, validator" />
    </Head>
  );
}