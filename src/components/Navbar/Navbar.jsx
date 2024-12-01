const Navbar = () => {
    return (
        <header>
            <div className="mt-4 border-b border-border">
                <div className="px-4 mx-auto sm:px-6 lg:px-8">
                    <nav className="relative flex items-center justify-between h-14 lg:h-16">
                        <div className="hidden lg:flex lg:items-center lg:space-x-10">
                            <a href="#" className="text-base font-medium text-muted-foreground hover:text-foreground">Features</a>
                            <a href="#" className="text-base font-medium text-muted-foreground hover:text-foreground">Solutions</a>
                            <a href="#" className="text-base font-medium text-muted-foreground hover:text-foreground">Resources</a>
                            <a href="#" className="text-base font-medium text-muted-foreground hover:text-foreground">About</a>
                        </div>

                        <div className="lg:absolute lg:-translate-x-1/2 lg:inset-y-3 lg:left-1/2">
                            <div className="flex-shrink-0">
                                <a href="#" className="flex">
                                    <img 
                                        className="w-auto h-6 lg:h-8" 
                                        src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg" 
                                        alt="Logo" 
                                    />
                                </a>
                            </div>
                        </div>

                        <button type="button" className="inline-flex p-2 ml-5 text-foreground transition-all duration-200 rounded-md lg:hidden hover:bg-accent">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>

                        <div className="hidden lg:flex lg:items-center lg:space-x-6">
                            <a 
                                href="#" 
                                className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
                            >
                                Get Started
                            </a>
                        </div>
                    </nav>
                </div>
            </div>

            <nav className="py-4 lg:hidden">
                <div className="px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">Menu</p>
                        <button type="button" className="inline-flex p-2 text-foreground transition-all duration-200 rounded-md hover:bg-accent">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-6">
                        <div className="flex flex-col space-y-2">
                            <a href="#" className="py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
                            <a href="#" className="py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors">Solutions</a>
                            <a href="#" className="py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors">Resources</a>
                            <a href="#" className="py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
                        </div>

                        <hr className="my-4 border-border" />

                        <div className="flex flex-col space-y-2">
                            <a 
                                href="#" 
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
                            >
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
