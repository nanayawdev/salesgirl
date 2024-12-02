app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https://gchkskdblqyfzzahqkjc.supabase.co https://*.supabase.co https://*.supabase.net wss://*.supabase.co;"
  );
  next();
}); 