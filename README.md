Pale Moon Window Renamer Downloads
==================================

This branch contains the addons files directly installable in Pale Moon.

Please report any problems on the [issue tracker](https://github.com/OmegaPhil/pale-moon-window-renamer/issues).

To download a file, click on the filename, then click View Raw. **DO NOT**
right click on a link, as this will save the web page, not the file.

All files are signed with my GPG key - to verify:

1. Install gpg: sudo aptitude install gpg
2. Fetch my public key: gpg --keyserver keys.gnupg.net --recv-keys 0xFDC2F38F
3. Confirm that the fingerprint of the key matches (so that you can trust my key): gpg --fingerprint 0xFDC2F38F

    E760 95EC DACD 5DEC 7653 A996 17D2 3C7D FDC2 F38F

4. Verify the xpi: gpg --verify *.sig

If you haven't imported my key, you'll get this:

    gpg: assuming signed data in `window-renamer_1.0.xpi'
    gpg: Signature made Mon 23 Nov 2015 14:38:35 GMT using RSA key ID FDC2F38F
    gpg: Can't check signature: public key not found

Otherwise:

    gpg: assuming signed data in `window-renamer_1.0.xpi'
    gpg: Signature made Mon 23 Nov 2015 14:38:35 GMT using RSA key ID FDC2F38F
    gpg: Good signature from "OmegaPhil <OmegaPhil@startmail.com>"
    gpg:                 aka "OmegaPhil <OmegaPhil@gmail.com>"
    gpg:                 aka "OmegaPhil <OmegaPhil00@startmail.com>"
    gpg: WARNING: This key is not certified with a trusted signature!
    gpg:          There is no indication that the signature belongs to the owner.
    Primary key fingerprint: E760 95EC DACD 5DEC 7653  A996 17D2 3C7D FDC2 F38F

The warning is due to you not defining the trust level you want to place in my public key that you just imported - the idea is you somehow verify the key in person (or via some other guaranteed route), which isn't really possible - just have to rely on git and TLS here!
