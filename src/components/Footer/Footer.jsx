import React from 'react';

const Footer = () => {
    return (
        <section className="py-12 bg-gradient-to-r from-gray-800 to-gray-900">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center xl:flex xl:items-center xl:justify-between xl:text-left">
                    <div className="xl:flex xl:items-center xl:justify-start">
                        <img className="w-auto mx-auto h-7" src="https://cdn.rareblocks.xyz/collection/celebration/images/logo-alt-2.svg" alt="" />

                        <p className="mt-5 text-sm text-white xl:ml-6 xl:mt-0">© Copyright {new Date().getFullYear()} SalesGirl</p>
                    </div>

                    <div className="items-center mt-8 xl:mt-0 xl:flex xl:justify-end xl:space-x-8">
                        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 xl:justify-end">
                            {['About', 'Privacy Policy', 'Terms & Conditions', 'Support'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="w-full h-px mt-8 mb-5 xl:w-px xl:m-0 xl:h-6 bg-gray-50/20"></div>

                        <ul className="flex items-center justify-center space-x-8 xl:justify-end">
                            {['M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z',
                              'M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z',
                              'M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z'].map((path, index) => (
                                <li key={index}>
                                    <a href="#" className="block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80">
                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d={path}></path>
                                        </svg>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
