import Head from 'next/head'

const HeadComp = ({title}) => {
  return (
    <Head>
        <title>{title}</title>
        <meta name="description" content="Vyperium - A decentralized platform for secure and seamless token management on the Venom blockchain." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css"/>
        <link rel="icon" href="/vyperium-logo.ico" />
    </Head>

  )
}
export default HeadComp
