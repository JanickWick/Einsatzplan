# Einsatzplan Spedition

Einfache Web-App für den Personal- und Einsatzplan der Spedition (Bäckerei).
Läuft ohne Installation im Browser – alles steckt in der einzelnen Datei **`index.html`**.

**Online-Adresse (GitHub Pages):** https://janickwick.github.io/Einsatzplan/

Auf dem Handy diese Adresse im Browser öffnen und «Zum Home-Bildschirm» hinzufügen (iPhone: Safari → Teilen → Zum Home-Bildschirm; Android: Chrome → Menü → Zum Startbildschirm hinzufügen).

## Öffnen

1. Die Datei `index.html` herunterladen (z. B. auf den Desktop oder in einen Ordner auf dem gemeinsamen Laufwerk).
2. Doppelklick auf die Datei – sie öffnet sich im Browser (Chrome, Edge, Firefox, Safari).
   Auf dem Handy: Datei z. B. per Mail/Cloud auf das Gerät bringen und im Browser öffnen.
3. Tipp: Die Seite als Lesezeichen speichern oder auf dem Handy «Zum Home-Bildschirm hinzufügen».

## Daten sichern

Die App speichert alle Daten automatisch **im Browser** (localStorage), also auf dem Gerät und im
Browser, in dem man die Datei geöffnet hat. Sie werden nicht automatisch zwischen Geräten geteilt.

- **Sicherung erstellen:** Einstellungen → Daten → «Sicherung exportieren (JSON)».
  Die Datei `einsatzplan-sicherung-JJJJ-MM-TT.json` an einem sicheren Ort ablegen (z. B. wöchentlich).
- **Sicherung einspielen / auf ein anderes Gerät übertragen:** Einstellungen → Daten →
  «Sicherung importieren (JSON)» und die gesicherte Datei auswählen.
- **Excel:** Im Wochenplan «Excel exportieren» erzeugt eine `.xlsx` der aktuellen Woche
  (Blätter: Wochenplan, Personal, Abwesenheiten).

Achtung: Wird der Browser-Verlauf/Website-Daten gelöscht oder ein anderer Browser verwendet,
sind die Daten dort nicht vorhanden – dann die letzte JSON-Sicherung importieren.

## Funktionen

- Übersicht: **Monatsplan** mit einer Zeile pro Person und einer Spalte pro Tag, Kalenderwochen als Trenner, Kürzel farbig nach Art: A = Abzählen (schliesst Fahren ein), F = Fahren (Tour steht klein darunter), X = Frei, K = Krank, Fe = Ferien, An = Andere. Kürzel in den Einstellungen änderbar. Rechts die Anzahl Tage und Stunden, unten offene Plätze. Monatsnavigation, Druck als PDF (Querformat) und farbiger Excel-Export.
- Excel-Export (Wochenplan und Monatsplan) mit Farben nach Art, grauen Kopfzeilen, Rahmen, fixierter Kopfzeile und Namensspalte.
- Wochenplan Mo–So mit Kalenderwoche und zwei Zeilen pro Tag: **Abzählen** (Plätze pro Wochentag einstellbar, mit «+ Platz» erweiterbar) und **Fahren** (mit «+ Fahren» eine Person eintragen, dazu die Tour wählen, damit sie sieht, welche Tour sie fährt; Ende wird nachträglich eingetragen, vorher gilt das ungefähre Ende der Tour). Im Auswahlfeld eines Abzähl-Platzes gibt es zusätzlich die Gruppe «Fahren» als Abkürzung.
- Handyansicht: Auf schmalen Bildschirmen zeigt die App einen Tag pro Bildschirm mit Tagesleiste Mo–So (Punkt: grün = alles besetzt, gelb = offen, rot = Konflikt). «Ganze Woche» schaltet auf die Tabelle um.
- Personalübersicht mit Einsätzen, Zeiten, Abwesenheiten und geplanten Stunden im Vergleich zum Pensum (überlappende Zeiten werden nur einmal gezählt). Pro Person lässt sich in den Einstellungen «Stunden anzeigen» ausschalten (Standard: aus für Aushilfen).
- Abwesenheiten (Ferien, Krank, Frei, Andere) mit Anzeige im Auswahlfeld.
- Prüfungen: abwesend aber eingeteilt, doppelt beim Abzählen – rot; mehrfach zum Fahren eingeteilt – Hinweis.
- «Vorwoche übernehmen», Löschen immer mit Bestätigung, Hell-/Dunkelmodus.
- Einstellungen: Mitarbeitende (Gruppe, Pensum, Stunden anzeigen, Farbe), Schichtzeiten, Abzähl-Plätze pro Wochentag, Touren (Name und ungefähres Ende).
