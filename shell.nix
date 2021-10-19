with import <nixpkgs> {};

stdenv.mkDerivation {
    name = "node";
    buildInputs = with pkgs; [
        nodejs
        yarn
    ];
    shellHook = ''
      yarn
    '';
}
