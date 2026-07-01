import http.server, socketserver, os, sys
target = sys.argv[1] if len(sys.argv) > 1 else r'C:\Users\PICHAU\Desktop\GTG GM'
os.chdir(target)
PORT = 8765
with socketserver.TCPServer(('', PORT), http.server.SimpleHTTPRequestHandler) as httpd:
    print(f"Serving {target} at http://localhost:{PORT}", flush=True)
    httpd.serve_forever()