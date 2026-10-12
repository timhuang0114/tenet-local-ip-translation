import sys
import unittest
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import tenet

class WorkflowTests(unittest.TestCase):
    def test_seeded_defects_and_review_gate(self):
        result=tenet.process({'sample':'patent'}, True)
        self.assertEqual(result['qa_issue_count'],2)
        targets=[s['target'] for s in result['segments']]
        with self.assertRaises(ValueError):tenet.export_html({'sample':'patent','targets':targets,'approvals':[]})
        targets[0]=targets[0].replace('檢測器','感測器')
        targets[2]=targets[2].replace('28°C','25°C')
        checked=tenet.process({'sample':'patent','targets':targets})
        self.assertEqual(checked['qa_issue_count'],0)
        approvals=[s['revision'] for s in checked['segments']]
        self.assertIn('25°C',tenet.export_html({'sample':'patent','targets':targets,'approvals':approvals}).decode('utf-8'))
        targets[0]+=' 修改'
        with self.assertRaises(ValueError):tenet.export_html({'sample':'patent','targets':targets,'approvals':approvals})

    def test_trademark_identity_and_items(self):
        result=tenet.process({'sample':'trademark'},True)
        self.assertEqual(result['qa_issue_count'],0)
        issues=tenet.qa('Mark: LEXORA. Class 9: software; programs.','商標；第10類：軟體',[],'trademark')
        self.assertTrue({'numbers','mark'} <= {x['rule'] for x in issues})

    def test_fixture_refuses_custom_source(self):
        with self.assertRaises(ValueError):tenet.process({'sample':'patent','source_text':'Not a fixture'},True)

    def test_repeated_numbers_and_units(self):
        self.assertTrue(tenet.qa('20 20 25°C','20 25°C',[],'patent'))
        self.assertTrue(tenet.qa('25°C','25',[],'patent'))
        self.assertFalse(tenet.qa('２５°C','25°C',[],'patent'))

    def test_export_escapes_markup(self):
        result=tenet.process({'sample':'trademark'},True)
        targets=[s['target'] for s in result['segments']];targets[0]+='<script>alert(1)</script>'
        checked=tenet.process({'sample':'trademark','targets':targets})
        # Added number causes QA rejection before export
        self.assertGreater(checked['qa_issue_count'],0)
        targets[0]=targets[0].replace('alert(1)','alert()')
        checked=tenet.process({'sample':'trademark','targets':targets})
        exported=tenet.export_html({'sample':'trademark','targets':targets,'approvals':[s['revision'] for s in checked['segments']]}).decode()
        self.assertIn('&lt;script&gt;',exported)
        self.assertNotIn('<script>',exported)

if __name__=='__main__':unittest.main()
